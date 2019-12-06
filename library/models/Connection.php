<?php

class Connection extends Model {

/** @var int $id */
    protected $id;

/** @var string $label */
    protected $label;

/** @var string $host */
    protected $host;

/** @var string $port */
    protected $port;

/** @var string $user */
    protected $user;

/** @var string $pass */
    protected $pass;

/** @var string $schema */
    protected $schema;

/** @var string $service_name */
    protected $service_name;

/*** @var bool $sid */
    protected $sid;

/**
 * @desc reservado para o oracle (se for true, usa a coluna service_name, senao usa a coluna sid)
 * @var bool $dedicated */
    protected $dedicated;

/** @var string $adapter */
    protected $adapter;

/** @var bool $enabled */
    protected $enabled;

/**
 * @desc determina se a conexão pode criar tabela seq no schema atual (depende do metodo allowed ser true)
 * @var string $table_sequence */
    protected $table_sequence;

/** @return string */
    public function getLabel() {
        return $this->label;
    }

/** @return string */
    public function getHost() {
        return $this->host;
    }

/** @return string */
    public function getPort() {
        return $this->port;
    }

/** @return string */
    public function getUser() {
        return $this->user;
    }

/** @return string */
    public function getPass() {
        return $this->pass;
    }

/** @return string */
    public function getSchema() {
        return $this->schema;
    }

/** @return string */
    public function getSid() {
        return $this->sid;
    }

/** @return string */
    public function getService_name() {
        return $this->service_name;
    }

/** @return bool */
    public function isDedicated() {
        return $this->dedicated;
    }

/** @return string */
    public function getAdapter() {
        return $this->adapter;
    }

/** @return bool */
    public function isEnabled() {
        return $this->enabled;
    }

/** @return string */
    public function getTable_sequence() {
        return $this->table_sequence;
    }

/** @param string $label */
    public function setLabel($label) {
        $this->label = $label;
    }

/** @param string $host */
    public function setHost($host) {
        $this->host = $host;
    }

/** @param string $port */
    public function setPort($port) {
        $this->port = $port;
    }

/** @param string $user */
    public function setUser($user) {
        $this->user = $user;
    }

/** @param string $pass */
    public function setPass($pass) {
        $this->pass = $pass;
    }

/** @param string $schema */
    public function setSchema($schema) {
        $this->schema = $schema;
    }

/** @param string $service_name */
    public function setService_name($service_name) {
        $this->service_name = $service_name;
    }

/** @param string $sid */
    public function setSid($sid) {
        $this->sid = $sid;
    }

/** @param bool $dedicated */
    public function setDedicated($dedicated) {
        $this->dedicated = $dedicated;
    }

/** @param string $adapter */
    public function setAdapter($adapter) {
        $this->adapter = $adapter;
    }

/** @param bool $enabled */
    public function setEnabled($enabled) {
        $this->enabled = $enabled;
    }

/** @param string $table_sequence */
    public function setTable_sequence($table_sequence) {
        $this->table_sequence = $table_sequence;
    }

}
