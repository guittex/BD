<?php

class PostgreSQL extends Database {

    public function allowed() {
        return true;
    }

    public function auto_set($mixed) {
        throw new Exception(sprintf('Implementar %s.auto_set(%s)', get_class($this), $mixed)); // TODO: terminar
    }

    public function getDSN() {

        if ($this->connection->getSchema()) {
            $dsn = sprintf('pgsql:host=%s;port=%s;dbname=%s', $this->connection->getHost(), $this->connection->getPort(), $this->connection->getSchema());
        }
        else {
            $dsn = sprintf('pgsql:host=%s;port=%s', $this->connection->getHost(), $this->connection->getPort());
        }

        return $dsn;
    }

    public function getInfo() {

        $info = array();

        $info[] = 'PostgreSQL:';
        $info[] = $this->connection->getHost();

        if ($this->connection->getPort()) {
            $info[] = ':';
            $info[] = $this->connection->getPort();
        }

        $info[] = '@';
        $info[] = $this->connection->getUser();

        return implode('', $info);
    }

    public function getPagedSQL($sql, $page, $num_rows = null, $from = null) {

        $page     = $page > 0 ? $page : 1;
        $num_rows = isset($num_rows) ? $num_rows : $this->getRowsPage();

        if (!$from) {

            if ($page > 0) {
                $to   = $page * $num_rows;
                $from = $to - $num_rows;
            }
            else {
                $from = 0;
            }

        }
        else {
            $from--; // use starting in 1
        }

        // SELECT * FROM tabela LIMIT 10 OFFSET 10; 11 a 20
        // SELECT * FROM tabela LIMIT 15 OFFSET 60; 61 a 75

        return sprintf("%s LIMIT %s OFFSET %s", $sql, $num_rows, $from);
    }

// ================================================================================================================

	public function getSQLTableSeq() {
	    return sprintf("CREATE TABLE %s (sequence_name VARCHAR(60) NOT NULL, increment_by NUMERIC(11) NOT NULL, last_number NUMERIC(11) NOT NULL)", $this->getTableSeqName());
	}

	public function getSQLColumns($tablename) {
	    return sprintf("SELECT
	    					table_name, column_name, column_default, is_nullable, data_type
	    				FROM information_schema.columns
	    				WHERE 1=1
	    				AND table_schema = '%s'
	    				AND table_name   = '%s'
	    				ORDER BY ordinal_position ASC", 'public', $tablename);
	}

	public function getSQLRoutines($type) {

	    // TODO: (routine) retornar => ro_name, ro_schema, ro_type, ro_body, ro_return, ro_parameters
	    // TODO: (parameter) retornar => pname, ptype, psize, pprecision, pscale, pmode

	    $sql = sprintf("SELECT
							routine_name ro_name, routine_type ro_type,
							routine_definition ro_body, dtd_identifier ro_return
						FROM information_schema.routines
						WHERE 1=1
						AND routine_schema = '%s'
						AND upper(routine_type) = '%s'", ($this->connection->getSchema() ? $this->connection->getSchema() : 'public'), strtoupper($type));

	    return $sql;
	}

	public function getSQLRoutineParameter($routine_name, $routine_type) {
	    return sprintf("SELECT
	                       parameter_name pname, data_type ptype, character_maximum_length psize,
	                       numeric_precision pprecision, numeric_scale pscale, parameter_mode pmode
	                   FROM information_schema.parameters
	                   WHERE 1=1
	                   AND specific_schema     = '%s'
	                   AND specific_name       = '%s'
	                   AND upper(routine_type) = '%s'
	                   AND parameter_mode IN ('IN', 'INOUT')
	                   ORDER BY ordinal_position ASC", $this->connection->getSchema(), $routine_name, $routine_type);
	    // TODO: conferir ao testar no PGs se eh realmente getUser ou getSchema
	}

    public function getSQLTables() {
        return sprintf("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_catalog = '%s' AND table_schema = 'public' ORDER BY table_name ASC", $this->connection->getSchema());
    }

    public function getSQLViews() { // select * from pg_catalog.pg_views;
    	return sprintf("SELECT table_name AS view_name FROM information_schema.tables WHERE table_type = 'VIEW' AND table_catalog = '%s' AND table_schema = 'public' ORDER BY table_name ASC", $this->connection->getSchema());
    }

    public function getSQLUsers() {
        return sprintf("SELECT usename AS user_name FROM pg_catalog.pg_user ORDER BY usename ASC");
    }

// ====================================================================================================================

    public function getColumns($tablename) {

    	$all        = $this->fetchAll($this->getSQLColumns($tablename));
    	$collection = new CollectionColumn();

    	foreach ($all as $linha) {

    		$column = new Column();

    		$column->setTableName($linha->TABLE_NAME);
    		$column->setName($linha->COLUMN_NAME);
    		$column->setType($linha->DATA_TYPE);
    		$column->setDefault((isset($linha->COLUMN_DEFAULT) ? $linha->COLUMN_DEFAULT : ''));
     		$column->setSize((isset($linha->CHARACTER_MAXIMUM_LENGTH) ? $linha->CHARACTER_MAXIMUM_LENGTH : 0));
     		$column->setPrecision((isset($linha->NUMERIC_PRECISION) ? $linha->NUMERIC_PRECISION : 0));
     		$column->setScale((isset($linha->NUMERIC_SCALE) ? $linha->NUMERIC_SCALE : 0));
    		$column->setNullable(($linha->IS_NULLABLE === 'YES'));
     		$column->setKey(null);
     		$column->setPrimaryKey(false);

    		$collection->add($column);
    	}

    	return $collection;
    }

}
