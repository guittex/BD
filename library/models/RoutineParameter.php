<?php

class RoutineParameter extends Model {

/** @var string $name */
    protected $name;

/** @var string $type */
    protected $type;

/** @var int $size */
    protected $size;

/** @var int $precision */
    protected $precision;

/** @var int $scale */
    protected $scale;

/** @var string $mode */
    protected $mode;

/** @return string */
    public function getName() {
        return $this->name;
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
    public function getMode() {
        return $this->mode;
    }

/** @param string $name */
    public function setName($name) {
        $this->name = $name;
    }

/** @param string $type */
    public function setType($type) {
        $this->type = $type;
    }

/** @param int $size */
    public function setSize($size) {
        $this->size = $size;
    }

/** @param int $precision */
    public function setPrecision($precision) {
        $this->precision = $precision;
    }

/** @param int $scale */
    public function setScale($scale) {
        $this->scale = $scale;
    }

/** @param string $mode */
    public function setMode($mode) {
        $this->mode = $mode;
    }

}
