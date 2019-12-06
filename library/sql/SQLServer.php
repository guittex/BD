<?php

class SQLServer extends Database {

    public function allowed() {
        return (!in_array($this->connection->getSchema(), ['information_schema', 'sys']));
    }

    public function auto_set($mixed) {
        throw new Exception(sprintf('Implementar %s.auto_set(%s)', get_class($this), $mixed)); // TODO: terminar
    }

    public function getDSN() {
        return sprintf('sqlsrv:Server=%s;Database=%s', $this->connection->getHost(), $this->connection->getSchema());
    }

    public function getInfo() {

        $info = array();
		
		$info[] = 'Microsoft SQL Server:';
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

        return sprintf('SELECT TOP %s ', $num_rows);		
    }

// ====================================================================================================================

    public function getSQLTableSeq() {
	    return sprintf("CREATE TABLE %s (sequence_name VARCHAR(60) NOT NULL, increment_by INTEGER NOT NULL, last_number INTEGER NOT NULL)", $this->getTableSeqName());
	}

	public function getSQLTables() {
	    return sprintf("select * from information_schema.tables WHERE table_catalog = '%s' AND table_type = 'BASE TABLE' ORDER BY table_name ASC", $this->connection->getSchema());
	}

	public function getSQLColumns($tablename) {
	    return sprintf("SELECT * FROM information_schema.columns WHERE table_catalog = '%s' AND table_name = '%s' ORDER BY ordinal_position ASC", $this->connection->getSchema(), $tablename);
	}

	public function getSQLRoutines($type) {
	    return null;
	}
	
	public function getSQLRoutineParameter($routine_name, $routine_type) {
	    return null;
	}

	public function getSQLUsers() {
	    return null;
	}

	public function getSQLViews() {
	    return null;
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
            $column->setPrecision((isset($linha->NUMERIC_PRECISION) ? $linha->NUMERIC_PRECISION : 0));
            $column->setScale((isset($linha->NUMERIC_SCALE) ? $linha->NUMERIC_SCALE : 0));
            $column->setNullable(($linha->IS_NULLABLE === 'YES'));
            $column->setPrimaryKey(false); // TODO: deve estar na tabela de indices (implementar depois)

            $collection->add($column);
        }

        return $collection;
	}
	
	public function getRoutines($type) {
	    throw new Exception(sprintf('Implementar %s.getRoutines(%s)', get_class($this), $type)); // TODO: terminar
	}

}
/*

SELECT  i.name AS IndexName,
        OBJECT_NAME(ic.OBJECT_ID) AS TableName,
        COL_NAME(ic.OBJECT_ID,ic.column_id) AS ColumnName,
		CASE WHEN i.is_primary_key = 1 THEN 'SIM' ELSE 'NAO' END AS PK
FROM    sys.indexes AS i INNER JOIN 
        sys.index_columns AS ic ON  i.OBJECT_ID = ic.OBJECT_ID
                                AND i.index_id = ic.index_id
WHERE   OBJECT_NAME(ic.OBJECT_ID) = 'SUATABELA'

select * from information_schema.tables;
select * from information_schema.columns where table_name = 'TABELA';

select * from sys.all_columns where object_id = object_id('TABELA');
select * from sys.columns where object_id = object_id('TABELA');
select * from sys.databases;
*/

// $conn = new PDO('sqlsrv:Server=mssql;Database=api', 'sa', 'M4st3rk3y@gv');
