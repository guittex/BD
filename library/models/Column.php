<?php

class Column extends Model {

	/** @var string $tablename */
	protected $tablename;

	/** @var string $name */
	protected $name;

	/**
	 * @deprecated
	 * @var string $key */
	protected $key;

	/** @var string $type */
	protected $type;

	/** @var int $size */
	protected $size;

	/** @var int $precision */
	protected $precision;

	/** @var int $scale */
	protected $scale;

	/** @var string $default */
	protected $default;

	/** @var bool $nullable */
	protected $nullable;

	/** @var bool $primaryKey */
	protected $primaryKey;

/** @return string */
	public function getTableName() {
	    return $this->tablename;
	}

/** @return string */
	public function getName() {
	    return $this->name;
	}

/**
 * @deprecated
 * @return string */
	public function getKey() {
	    return $this->key;
	}

/** @return string */
	public function getType() {
	    return $this->type;
	}

/** @return int */
	public function getSize() {
	    return $this->size;
	}

/** @return int */
	public function getPrecision() {
	    return $this->precision;
	}

/** @return int */
	public function getScale() {
	    return $this->scale;
	}

/** @return string */
	public function getDefault() {
	    return $this->default;
	}

/** @return bool */
	public function isNullable() {
	    return $this->nullable;
	}

/** @return bool */
	public function isPrimaryKey() {
	    return $this->primaryKey;
	}

/** @param string $tablename */
	public function setTableName($tablename) {
	    $this->tablename = $tablename;
	}

/** @param string $name */
	public function setName($name) {
	    $this->name = $name;
	}

/** @param string $key */
	public function setKey($key) {
	    $this->key = $key;
	}

/** @param string $type */
	public function setType($type) {
	    $this->type = $type;
	}

/** @param string $size */
	public function setSize($size) {
	    $this->size = $size;
	}

/** @param string $precision */
	public function setPrecision($precision) {
	    $this->precision = $precision;
	}

/** @param string $scale */
	public function setScale($scale) {
	    $this->scale = $scale;
	}

/** @param string $default */
	public function setDefault($default) {
	    $this->default = $default;
	}

/** @param string $nullable */
	public function setNullable($nullable) {
	    $this->nullable = $nullable;
	}

/** @param string $primaryKey */
	public function setPrimaryKey($primaryKey) {
	    $this->primaryKey = $primaryKey;
	}

}
