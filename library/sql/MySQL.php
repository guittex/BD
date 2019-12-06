<?php

class MySQL extends Database {

    public function allowed() {
        return ($this->connection->getSchema() && !in_array($this->connection->getSchema(), ['information_schema', 'mysql', 'performance_schema']));
    }

    public function auto_set($mixed) { // VIEW --> BD

        if (assigned($mixed)) {

            $mixed = trim($mixed);

            if (strpos($mixed, ',') !== false && strpos($mixed, '.') !== false) { // 1.665,99
                $aux = str_replace(',', '.', str_replace('.', '', $mixed));
            }
            else {
                $aux = str_replace(',', '.', $mixed);
            }

            if (is_numeric($aux)) {
                $mixed = $aux;
            }
            else {

                if (preg_match("/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/", $mixed)) {

                    $split = explode(' ', $mixed);
                    $date  = explode('/', $split[0]);
                    $day   = $date[0];
                    $mon   = $date[1];
                    $year  = $date[2];
                    $hour  = 0;
                    $min   = 0;
                    $sec   = 0;

                    if (isset($split[1])) {
                        $split[1] = explode(':', $split[1]);
                        $hour     = intval($split[1][0]);
                        $min      = intval($split[1][1]);
                        $sec      = intval($split[1][2]);
                    }

                    if (!($hour == 0 && $min == 0 && $sec == 0)) {
                        $mixed = sprintf('%s-%s-%s %s:%s:%s', $year, $mon, $day, str_pad($hour, 2, '0', STR_PAD_LEFT), str_pad($min, 2, '0', STR_PAD_LEFT), str_pad($sec, 2, '0', STR_PAD_LEFT));
                    }
                    else {
                        $mixed = sprintf('%s-%s-%s', $year, $mon, $day);
                    }

                }

            }

        }
        else {
            $mixed = "";
        }

        return $mixed;
    }

    public function getDSN() {

        if ($this->connection->getSchema()) {
            $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s', $this->connection->getHost(), $this->connection->getPort(), $this->connection->getSchema());
        }
        else {
            $dsn = sprintf('mysql:host=%s;port=%s', $this->connection->getHost(), $this->connection->getPort());
        }

        return $dsn;
    }

    public function getInfo() {

        $info = array();

		$info[] = 'MySQL:';
		$info[] = $this->connection->getHost();

		if ($this->connection->getPort()) {
			$info[] = ':';
			$info[] = $this->connection->getPort();
		}

		$info[] = '@';
		$info[] = $this->connection->getUser();

		if ($this->connection->getSchema()) {
			$info[] = '/';
			$info[] = $this->connection->getSchema();
		}

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

		return sprintf("%s LIMIT %s, %s", $sql, $from, $num_rows);
	}

// ====================================================================================================================

	public function getSQLTableSeq() {
	    return sprintf("CREATE TABLE %s (sequence_name VARCHAR(60) NOT NULL, increment_by INT(11) NOT NULL, last_number INT(11) NOT NULL)", $this->getTableSeqName());
	}

	public function getSQLTables() {
/*
	    $type   = $this->connection->getSchema() == 'information_schema' ? 'SYSTEM VIEW' : 'BASE TABLE'; // or VIEW para views
	    $column = sprintf('Tables_in_%s', $this->connection->getSchema());

	    return "SHOW FULL TABLES WHERE table_type = '{$type}'";
*/
	    return sprintf("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = '%s' ORDER BY table_name ASC", $this->connection->getSchema());
	}

	public function getSQLViews() {
/*
	    $column = sprintf('Tables_in_%s', $this->connection->getSchema());

	    return "SHOW FULL TABLES WHERE table_type = 'VIEW'";
*/
	    return sprintf("SELECT table_name AS view_name FROM information_schema.tables WHERE table_type = 'VIEW' AND table_schema = '%s' ORDER BY table_name ASC", $this->connection->getSchema());
	}

	public function getSQLColumns($tablename) {
	    return sprintf("SELECT * FROM information_schema.columns WHERE table_schema = '%s' AND table_name = '%s' ORDER BY ordinal_position ASC", $this->connection->getSchema(), $tablename);
	}

	public function getSQLRoutines($type) {

	    // parametros da rotina => $result = fetchAll("SELECT parameter_name nome, data_type tipo, character_maximum_length tamanho, numeric_precision precisao, numeric_scale escala FROM information_schema.parameters WHERE 1=1 AND specific_schema = '{$db}' AND specific_name = '{$linha->nome}' AND upper(routine_type) = '{$type}' AND parameter_mode = 'IN' ORDER BY ordinal_position ASC");
	    // return $this->fetchAll(sprintf("SELECT name AS routine_name, param_list AS routine_arguments, returns AS routine_returns, body AS routine_body FROM mysql.proc WHERE type = 'PROCEDURE' AND db = '%s' ORDER BY name ASC", $this->schema));

	    $sql = sprintf("SELECT
							routine_name ro_name, routine_type ro_type,
                            routine_definition ro_body, dtd_identifier ro_return
						FROM information_schema.routines
						WHERE 1=1
						AND routine_schema = '%s'
						AND upper(routine_type) = '%s'", $this->connection->getSchema(), strtoupper($type));

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
	}

	public function getSQLUsers() {
//		return sprintf("select user AS user_name from mysql.user WHERE host = '%s' AND user is not null AND user <> '' ORDER BY user ASC", $this->db->host));
	    return sprintf("SELECT user AS user_name FROM mysql.user ORDER BY user ASC");
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
            $column->setKey($linha->COLUMN_KEY);
            $column->setPrimaryKey((strpos($linha->COLUMN_KEY, 'PRI') !== false));

            $collection->add($column);
        }

        return $collection;
	}

/**
 * @desc retorna os bancos de dados da conexão atual
 * @return CollectionDB */
	public function getDatabases() {

	    $databases  = $this->fetchPairs("SHOW DATABASES", 'Database');
	    $collection = new CollectionDB();

        foreach ($databases as $dbname) {

            $model = new DB();
            $model->setName($dbname);

            $collection->add($model);
        }

        return $collection;
	}

}
