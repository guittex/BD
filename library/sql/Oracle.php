<?php

class Oracle extends Database {
    
    public function allowed() {
        return true;
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
                
                if (preg_match("/^[0-9]{4}-[0-9]{2}-[0-9]{2}/", $mixed)) {
                    
                    $split = explode(' ', $mixed);
                    $date  = explode('-', $split[0]);
                    $mixed = sprintf('%s/%s/%s', $date[2], $date[1], $date[0]);
                    
                    if (isset($split[1])) {
                        $mixed = sprintf('%s %s', $mixed, $split[1]);
                    }
                    
                }
                
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
                    
                    $mixed = sprintf('%s/%s/%s %s:%s:%s', $day, $mon, $year, str_pad($hour, 2, '0', STR_PAD_LEFT), str_pad($min, 2, '0', STR_PAD_LEFT), str_pad($sec, 2, '0', STR_PAD_LEFT));
                }
                
            }
            
        }
        else {
            $mixed = "";
        }
        
        return $mixed;
    }
    
    public function createTableSeq() {
         // vazio pq oracle nao precisa
    }

    public function getDSN() {
        return sprintf('oci:dbname=%s', $this->getString());
    }

    public function getInfo() {

        $info = array();
        $sid  = explode(':', $this->getSIDInfo());

        $info[] = 'Oracle:';
        $info[] = $this->connection->getHost();

        if ($this->connection->getPort()) {
            $info[] = ':';
            $info[] = $this->connection->getPort();
        }

        $info[] = '@';
        $info[] = $this->connection->getUser();

        $info[] = '/';
        $info[] = $sid[1];

        if ($this->connection->isDedicated() === true) {
            $info[] = ' (dedicated)';
        }

        return implode('', $info);
    }

    public function getPagedSQL($sql, $page, $num_rows = null, $from = null) {
        
        $page     = $page > 0 ? $page : 1;
        $num_rows = isset($num_rows) ? $num_rows : $this->getRowsPage();
        
        if (!$from) {
            $to   = $page * $num_rows;
            $from = $to - $num_rows + 1;
        }
        else { // use starting in 1
            $to = $from + $num_rows - 1;
        }
        
        return "SELECT * FROM (SELECT row_number() OVER () AS row_id_new, A.* FROM ({$sql}) A) B WHERE row_id_new BETWEEN {$from} AND {$to}";
    }

/** 
 * @desc retorna o corpo da rotina $routine_name (FUNCTION | PROCEDURE)
 * @param string $routine_name
 * @param string $routine_type
 * @return string */
    public function getRoutineBody($routine_name, $routine_type) {
        return $this->fetchCol(sprintf("SELECT DBMS_METADATA.GET_DDL('%s', '%s') AS corpo FROM DUAL", strtoupper($routine_type), strtoupper($routine_name)), 'corpo');
    }

    function getSequenceNextVal($sequence_name) {

        $args  = func_get_args();
        $inc   = isset($args[1]) ? $args[1] : true;

        if (!$inc) {
            $this->beginTransaction();
        }

        $id = intval($this->fetchCol("SELECT {$sequence_name}.nextval FROM dual", 'last_number'));

        if (!$inc) {
            $this->rollback();
        }
        
        return $id;
    }

/**
 * @deprecated
 * @return string */
    public function getSIDInfo() {

        if ($this->connection->getSid()) {
            $info = sprintf('SID:%s', $this->connection->getSid());
        }
        else {
            $info = sprintf('SERVICE_NAME:%s', $this->connection->getService_name());
        }

        return $info;
    }

/** 
 * @deprecated
 * @desc retorna a string de conexao (era util na function oci_connect)
 * @return string */
    public function getString() {

        $arr = explode(':', $this->getSIDInfo());
            
        $sid_label = $arr[0];
        $sid_val   = $arr[1];
        $dedi_val  = $this->connection->isDedicated() === true ? '(SERVER = DEDICATED) ' : '';
        
        return sprintf(' (DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP) (HOST = %s)(PORT = %s)))(CONNECT_DATA = %s(%s = %s)))', $this->connection->getHost(), $this->connection->getPort(), $dedi_val, $sid_label, $sid_val);
    }

// ================================================================================================================

    public function getSQLTableSeq() {
        return null; // oracle nao precisa
    }

    public function getSQLColumns($tablename) { // TODO: trazer campos restantes (is_nullable (YES | NO))
        return "SELECT 
                    '{$tablename}' AS table_name, column_name, data_type, 
                        data_length, data_precision AS numeric_precision, data_scale AS numeric_scale, 
                        nullable AS is_nullable,
                        '[TRAZER]' AS column_default, '[TRAZER]' AS column_key,
                FROM USER_TAB_COLUMNS 
                WHERE table_name = upper('{$tablename}') 
                ORDER BY column_id ASC";
    }

    public function getSQLRoutines($type) { // TODO: trazer demais campos
        return sprintf("SELECT 
                            object_name ro_name, object_type ro_type,
                            '[TRAZER RETORNO]' AS ro_return
                        FROM user_procedures 
                        WHERE object_type = '%s' 
                        ORDER BY object_name ASC", $type);
    }
    
    public function getSQLRoutineParameter($routine_name, $routine_type) {
        return null; // TODO: implementar quando necessario
    }

    public function getSQLTables() {
//        return "SELECT tname AS table_name FROM tab WHERE tname NOT LIKE 'BIN%' AND tabtype = '{$type}' ORDER BY tname ASC";
        return sprintf("SELECT table_name FROM all_tables WHERE owner = upper('%s') ORDER BY table_name ASC", $this->connection->getUser());
    }

    public function getSQLViews() {
        return sprintf("SELECT view_name FROM all_views WHERE owner = upper('%s') ORDER BY view_name ASC", $this->connection->getUser());
    }

    public function getSQLUsers() {
        return sprintf("SELECT username AS user_name FROM ALL_USERS ORDER BY username ASC");
    }

// ================================================================================================================

    public function getColumns($tablename) {

        $all        = $this->fetchAll($this->getSQLColumns($tablename));
        $collection = new CollectionColumn();

        foreach ($all as $linha) {

            $column = new Column();

            $column->setTableName($linha->TABLE_NAME);
            $column->setName($linha->COLUMN_NAME);
            $column->setType($linha->DATA_TYPE);
            $column->setSize((isset($linha->DATA_LENGTH) ? $linha->DATA_LENGTH : 0));
            $column->setPrecision((isset($linha->NUMERIC_PRECISION) ? $linha->NUMERIC_PRECISION : 0));
            $column->setScale((isset($linha->NUMERIC_SCALE) ? $linha->NUMERIC_SCALE : 0));
            $column->setNullable($linha->IS_NULLABLE); // TODO: arrumar aqui ao testar (oracle)
//          $column->setNullable(($linha->IS_NULLABLE === 'YES'));
            $column->setDefault((isset($linha->COLUMN_DEFAULT) ? $linha->COLUMN_DEFAULT : ''));
            $column->setKey($linha->COLUMN_KEY);
            $column->setPrimaryKey((strpos($linha->COLUMN_KEY, 'PRI') !== false)); // TODO: implementar

            if ($column->getType() == 'NUMBER') {

                if ($column->getScale()) {
                    $column->setType(sprintf('%s(%s, %s)', $column->getType(), $column->getPrecision(), $column->getScale()));
                }
                else {
                    $column->setType(sprintf('%s(%s)', $column->getType(), $column->getSize()));
                }

            }
            else if ($column->getType() == 'CHAR' || $column->getType() == 'VARCHAR2') {
                $column->setType(sprintf('%s(%s)', $column->getType(), $column->getSize()));
            }

            $collection->add($column);
        }
        
        return $collection;
    }

    public function getRoutines($type) {

        $linhas     = $this->fetchAll($this->getSQLRoutines($type));
        $collection = new CollectionRoutine();

        foreach ($linhas as $linha) {

            $collectionParam = new CollectionRoutineParameter();
            $sql_param       = $this->getSQLRoutineParameter($linha->RO_NAME, $linha->RO_TYPE);
            $parameters      = $sql_param ? $this->fetchAll($sql_param) : []; 

            // TODO: buscar lista de parametros da rotina no oracle

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
            $Routine->setBody($this->getRoutineBody($linha->RO_NAME, $linha->RO_TYPE));
            $Routine->setReturn($linha->RO_RETURN);
            $Routine->setParameters($collectionParam);

            $collection->add($Routine);
        }

        return $collection;
    }

}
