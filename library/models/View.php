<?php

class View extends Model {

/** @var string $name */
    protected $name;

/** @return string */
    public function getName() {
        return $this->name;
    }

/** @param string $name */
    public function setName($name) {
        $this->name = $name;
    }

// ====================================================================================================================

    public function getPKName() {
        return 'name';
    }

}
