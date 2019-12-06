<?php

/**
 * ORM para manipulação de banco de dados relacionais MySQL, Oracle, PostgreSQL e SQLServer para php versão a partir 7.0
 * usando PDO
 * */
abstract class Database {

/** @var Connection $connection */
    protected $connection;

/** @var PDO $pdo */
    protected $pdo;

/**
 * @desc define se as colunas das tuplas retornadas terão letras maiusculas ou minusculas
 * @var int $STR_CASE */
    protected $STR_CASE = CASE_UPPER;

    function __construct(Connection $connection) {

        try {
            $this->connection = $connection;
            $this->pdo        = new PDO($this->getDSN(), $connection->getUser(), $connection->getPass());
        }
        catch (Exception $e) {
            throw new PDOException($e->getMessage());
        }

    }

    /**
     * @param string $mixed
     * @return string */
    public function auto_get($mixed) {

    	$type = gettype($mixed);

    	if ($type == 'string') {

   			if (preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}/', $mixed)) {

   				$split = explode(' ', $mixed);
   				$date  = explode('-', $split[0]);
   				$time  = isset($split[1]) ? $split[1] : null;

   				$mixed = trim(sprintf('%s/%s/%s %s', $date[2], $date[1], $date[0], $time));
   			}
/*
	    	if (APP_CHARSET == 'utf-8') {

	    		$mixed = utf8_encode($mixed);

	    		if (strstr($mixed, 239) !== false) {
	    			$mixed = 'monza';
	    		}
	    		else {
	    			$mixed = 'newFiesta';
	    		}

//	    		$mixed = ord('�');
	    	}
*/
    	}

    	return $mixed;
    }

/**
 * @desc inicia uma transação (commit e rollback manuais)
 * @return bool */
    public function beginTransaction() {
        return $this->pdo->beginTransaction();
    }

/**
 * @desc Commits a transaction
 * @return bool */
    public function commit() {
        return $this->pdo->commit();
    }

/**
 * @desc cria a tabela 'seq' no schema atual (somente se o schema nao for reservado e se $connection->table_sequence is not null)
 * @return void */
    public function createTableSeq() {

        $class = get_class($this); // TODO: chamar este metodo manualmente (criar uma rota no front-end)

        if ($class != 'Oracle') {

            if (in_array($class, ['MySQL', 'PostgreSQL', 'SQLServer'])) {

                if ($this->allowed()) {

                    if (!empty($this->connection->getTable_sequence())) {

                        $exec = $this->pdo->exec($this->getSQLTableSeq());

                        if ($exec === false) {
                            throw new PDOException("Falha ao criar tabela seq\n" . print_r($this->pdo->errorInfo(), true));
                        }

                    }
                    else {
                        throw new Exception("Permiss�o negada ao tentar criar tabela de sequences. #2");
                    }

                }
                else {
                    throw new Exception("Permiss�o negada ao tentar criar tabela de sequences. #1");
                }

            }
            else {
                throw new Exception("classe ({$class}) nao implementada em createTableSeq");
            }

        }

    }

/**
 * @param string $sql
 * @param int $page (opcional)
 * @param int $num_rows (opcional)
 * @param int $from (opcional)
 * @return Paginator */
    public function fetchPages($sql, $page = null, $num_rows = null, $from = null) {

		$page     = isset($page)     ? intval($page)     : 0;
		$num_rows = isset($num_rows) ? intval($num_rows) : $this->getRowsPage();

		if ($page === 1 && $num_rows === 1 && $from === 1) {
		    $total = 1;
		}
		else {
            $total = $this->rows($sql);
		}

		if ($page > 0) {
			$sql   = $this->getPagedSQL($sql, $page, $num_rows, $from);
			$pages = ceil(($total / $num_rows));
			$ate   = $page * $num_rows;
			$de    = $from + 1;
		}
		else {
			$pages = 1;
			$ate   = $total;
			$de    = 1;
		}

		if (!($total > 0 && $ate > 0 && $de > 0)) {
			$total = 0;
			$ate   = 0;
			$de    = 0;
		}
		else {
			$ate = $ate <= $total ? $ate : $total;
		}

		$paginator = new Paginator();
		$query     = $this->pdo->query($sql);

		if ($query !== false) {

    		$linhas    = $query->fetchAll(PDO::FETCH_ASSOC);
    		$all       = [];
            $index     = 0;

    		foreach ($linhas as $linha) {

    		    // TODO: implementar popular Model
    		    // TODO: implementar callback

    		    $all[$index] = (object) $this->transform($linha);
    		    $index++;
    		}

    		$paginator->setTotal($total);
    		$paginator->setFrom($de);
    		$paginator->setTo($ate);
    		$paginator->setPages($pages);
    		$paginator->setPage($page);
    		$paginator->setAll($all);

    		return $paginator;
		}
		else {
		    throw new PDOException("error in sql {$sql}");
		}

	}

/**
 * @param string $sql
 * @return stdclass[] */
    public function fetchAll($sql) {
        return $this->fetchPages($sql)->getAll();
    }

/**
 * @desc retorna o valor de uma coluna especifica em uma tupla da instrução sql (retorna nulo se nenhuma tupla foi achada ou $columnName nao existe na tupla)
 * @param string $sql
 * @param string $columnName
 * @return string */
    public function fetchCol($sql, $columnName) {

        $linha      = $this->fetchRow($sql);
        $columnName = $this->transform($columnName);

        if ($linha !== null && isset($linha->$columnName)) {
            return $linha->$columnName;
        }

        return null;
	}

/**
 * @desc retorna uma unica linha da instrucao sql em $sql (ou retorna null se nenhum linha for achada)
 * @param string $sql
 * @return stdClass */
	public function fetchRow($sql) {

		$linhas = $this->fetchPages($sql, 1, 1, 1)->getAll();

		if (!empty($linhas)) {
			return $linhas[0];
		}

		return null;
	}

/** @return array */
    public function fetchPairs($sql, $field_value = null, $field_text = null) {

		$field_value = $this->transform((isset($field_value) ? $field_value : 0));
		$field_text  = $this->transform((isset($field_text)  ? $field_text  : $field_value));

		$resultset   = $this->pdo->query($sql);
		$pairs       = [];

		if ($resultset === false) {
		    throw new Exception('error in sql ' . $sql);
		}

        $linhas = $resultset->fetchAll(PDO::FETCH_ASSOC);

        // TODO: otimizar depois

        foreach ($linhas as $linha) {
            $linha = $this->transform($linha);
            $pairs[$linha[$field_value]] = $linha[$field_text];
        }

        return $pairs;
	}

/**
 * @desc retorna os objetos disponíveis para visualização. (ex: Tables, Views, Sequences, etc)
 * @return array */
    public function getAttributes() {

        $atts = array();

		$atts['table'] = 'Tables'; // tables é comum para todos, por isso sem metodo allowed

		if ($this->allowed()) { // se esquemas do usuario
	        $atts['view']      = 'Views';
	        $atts['sequence']  = 'Sequences';
	        $atts['function']  = 'Functions';
	        $atts['procedure'] = 'Procedures';
	        $atts['user']      = 'Users';
		}

		return $atts;
    }

/** @return Connection */
    public function getConnection() {
        return $this->connection;
    }

/** @return PDO */
    public function getPDO() {
        return $this->pdo;
    }

/**
 * @desc retorna quantidade de registros por pagina
 * @return int */
    public function getRowsPage() {
        return 10;
    }

/**
 * @param string $sequence_name
 * @return int */
    public function getSequenceCurrVal($sequence_name) {
		return $this->getSequenceNextVal($sequence_name, false);
	}

/**
 * @param string $sequence_name
 * @return int */
    public function getSequenceNextVal($sequence_name) {

        $args  = func_get_args();
		$inc   = isset($args[1]) ? $args[1] : true;
		$id    = 0;
		$seq   = $sequence_name;
		$table = $this->getTableSeqName();

		$sql   = sprintf("SELECT last_number FROM %s WHERE sequence_name = '%s'", $table, $seq);
		$row   = $this->fetchRow($sql);

		if ($row !== null) {

			$id = intval($row->last_number);

			if ($inc) {
				$this->pdo->exec(sprintf("UPDATE %s SET last_number = last_number + increment_by WHERE sequence_name = '%s'", $table, $seq));
			}

		}

		return $id;
	}

/**
 * @desc retorna o nome da tabela seq no schema atual (para criacao e listagem)
 * @return string */
	public function getTableSeqName() {
		return $this->connection->getTable_sequence();
	}

/** @return bool */
    public function isConnected() {
        return (is_object($this->pdo));
    }

/** @return bool */
    public function isDML($sql) {
		$sql = new PString(strtoupper(trim($sql)));
		return ($sql->startsWith('INSERT') || $sql->startsWith('UPDATE') || $sql->startsWith('DELETE'));
	}

/** @return bool */
	public function isSelect($sql) {
		$sql = new PString(strtoupper(trim($sql)));
		return ($sql->startsWith('SELECT') || $sql->startsWith('SHOW'));
	}

/** @return bool */
    public function isTransaction() {
        return $this->pdo->inTransaction();
    }
/**
 * @desc Rolls back a transaction
 * @return bool */
    public function rollback() {
        return $this->pdo->rollBack();
    }

/**
 * @desc retorna a qtde de linhas de uma instrução sql
 * @param string $sql
 * @return int */
	public function rows($sql) {
		return intval($this->fetchCol("SELECT count(*) AS quantos FROM ({$sql}) sqlquantos", 'quantos'));
	}

/**
 * @desc padroniza o case das letras em $mixed
 * @param array|int|string $mixed
 * @return array|int|string */
	public function transform($mixed) {

	    $type = gettype($mixed);

	    if ($type == 'array') {

	    	$mixed = array_change_key_case($mixed, $this->STR_CASE);

	    	foreach ($mixed as $name => $value) {
	    		$mixed[$name] = $this->auto_get($value);
	    	}

	    }
	    else if ($type == 'string') {
	        return ($this->STR_CASE == CASE_UPPER ? strtoupper($mixed) : strtolower($mixed));
	    }

	    return $mixed;
	}

// ====================================================================================================================

/**
 * @desc retorna as functions da conexao atual
 * @return CollectionRoutine */
    public function getFunctions() {
		return $this->getRoutines('FUNCTION');
	}

/**
 * @desc retorna as procedures da conexao atual
 * @return CollectionRoutine */
    public function getProcedures() {
		return $this->getRoutines('PROCEDURE');
	}

/**
 * @desc retorna as rotinas (function ou procedure) do schema atual
 * @return CollectionRoutine */
	public function getRoutines($type) {

	    $linhas     = $this->fetchAll($this->getSQLRoutines($type));
	    $collection = new CollectionRoutine();

	    foreach ($linhas as $linha) {

	        $collectionParam = new CollectionRoutineParameter();
	        $parameters      = $this->fetchAll($this->getSQLRoutineParameter($linha->RO_NAME, $linha->RO_TYPE));

	        foreach ($parameters as $pLinha) {

	            $Parameter = new RoutineParameter();
	            $Parameter->setName($pLinha->PNAME);
	            $Parameter->setType($pLinha->PTYPE);
	            $Parameter->setSize($pLinha->PSIZE);
	            $Parameter->setPrecision($pLinha->PPRECISION);
	            $Parameter->setScale($pLinha->PSCALE);
	            $Parameter->setMode($pLinha->PMODE);

	            $collectionParam->add($Parameter);
	        }

	        $Routine = new Routine();
	        $Routine->setType($linha->RO_TYPE);
	        $Routine->setName($linha->RO_NAME);
	        $Routine->setBody($linha->RO_BODY);
	        $Routine->setReturn($linha->RO_RETURN);
	        $Routine->setParameters($collectionParam);

	        $collection->add($Routine);
	    }

	    return $collection;
	}

/** @return CollectionSequence */
	public function getSequences() {

   	    $collection = new CollectionSequence();

   	    if ($this->connection->getAdapter() == 'oracle') {
   	        $ok = true;
   	    }
   	    else {
   	    	$ok = !empty($this->getTableSeqName()) && in_array($this->getTableSeqName(), $this->getTables()->getColumn('name'));  // TODO: melhorar desempenho aqui
   	    }

	    if ($ok) {

	        $all = $this->fetchAll($this->getSQLSequences());

            foreach ($all as $linha) {

                $sequence = new Sequence();
                $sequence->setSequence_name($linha->SEQUENCE_NAME);
                $sequence->setIncrement_by($linha->INCREMENT_BY);
                $sequence->setLast_number($linha->LAST_NUMBER);

                $collection->add($sequence);
    	    }

	    }

	    return $collection;
	}

/**
 * @desc retorna as tabelas do schema atual
 * @return CollectionTable */
	public function getTables() {

	    $sql = $this->getSQLTables();

	    if ($sql) {

    	    $linhas     =  $this->fetchPairs($sql, 'table_name');
            $collection = new CollectionTable();

            foreach ($linhas as $name) {

                $model = new Table();
                $model->setName($name);

                $collection->add($model);
            }

            return $collection;
	    }

	    throw new Exception(sprintf('Implementar %s.getSQLTables', get_class($this)));
	}

/**
 * @desc retorna os usuarios do schema atual
 * @return CollectionUser */
	public function getUsers() {

	    $sql = $this->getSQLUsers();

	    if ($sql) {

    	    $linhas     =  $this->fetchPairs($sql, 'user_name');
            $collection = new CollectionUser();

            foreach ($linhas as $name) {

                $model = new User();
                $model->setName($name);

                $collection->add($model);
            }

            return $collection;
	    }

	    throw new Exception(sprintf('Implementar %s.getSQLUsers', get_class($this)));
	}

/**
 * @desc retorna as views do schema atual
 * @return CollectionView */
	public function getViews() {

	    $sql = $this->getSQLViews();

	    if ($sql) {

	        $linhas     =  $this->fetchPairs($sql, 'view_name');
	        $collection = new CollectionView();

	        foreach ($linhas as $name) {

	            $model = new View();
	            $model->setName($name);

	            $collection->add($model);
	        }

	        return $collection;
	    }

        throw new Exception(sprintf('Implementar %s.getSQLViews', get_class($this)));
	}

// ====================================================================================================================

/**
 * @desc retorna true se a conexão não for reservada pelo sistema de banco de dados
 * @return bool */
    abstract public function allowed();

/**
 * @deprecated
 * @desc adapta o valor de entrada $mixed para gravação no bd atual
 * @return string */
    abstract public function auto_set($mixed);
/**
 * @desc retorna as colunas de uma tabela $tablename
 * @return CollectionColumn */
    abstract public function getColumns($tablename);

/**
 * @desc retorna a string de conexão com o BD
 * @return string */
    abstract public function getDSN();

/**
 * @desc retorna informações sobre a conexão
 * @return string */
    abstract public function getInfo();

/**
 * @desc retorna uma consulta sql com paginação no padrão do banco de dados atual
 * @return string */
    abstract public function getPagedSQL($sql, $page, $num_rows = null, $from = null);

/**
 * @desc retorna o script sql para criacao da tabela seq
 * @return string */
    abstract public function getSQLTableSeq();

/**
 * @desc retorna o sql de listagem das tabelas (coluna nome = table_name)
 * @return string */
    abstract public function getSQLTables();

/**
 * @desc retorna o sql de listagem das colunas
 * @param string $tablename
 * @return string */
    abstract public function getSQLColumns($tablename);

/**
 * @desc retorna o sql de listagem das rotinas (function e procedure) |
 * campos na consulta sql (ro_name, ro_schema, ro_type, ro_body, ro_return)
 * @param string $type
 * @return string */
    abstract public function getSQLRoutines($type);

/**
 * @desc retorna o sql de listagem dos parametros da rotina (function e procedure) |
 * campos na consulta sql (pname, ptype, psize, pprecision, pscale, pmode)
 * @param string $routine_name - o nome da rotina
 * @param string $routine_type - o tipo (FUNCTION | PROCEDURE)
 * @return string */
    abstract public function getSQLRoutineParameter($routine_name, $routine_type);

/**
 * @desc retorna o sql de listagem das sequences
 * @return string */
    public function getSQLSequences() { // todos seguindo padrao oracle, por isto nao eh abstrata
        return sprintf("SELECT sequence_name, increment_by, last_number FROM %s ORDER BY sequence_name ASC", $this->getTableSeqName());
    }

/**
 * @desc retorna o sql de listagem dos usuarios (coluna nome = user_name)
 * @return string */
    abstract public function getSQLUsers();

/**
 * @desc retorna o sql de listagem das views (coluna nome = view_name)
 * @return string */
    abstract public function getSQLViews();

// ====================================================================================================================

}
