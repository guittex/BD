<?php

abstract class PObject {

/**
 * @desc retorna uma nova instance da propria classe
 * @return PObject */
    public function newInstance() {
        $class = get_class($this);
        return new $class();
    }

}
