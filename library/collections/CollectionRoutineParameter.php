<?php

class CollectionRoutineParameter extends Collection {
    
/** @param RoutineParameter $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return RoutineParameter */
    public function current() {
        return parent::current();
    }

/** @return RoutineParameter */
    public function find($index) {
        return parent::find($index);
    }

/** @return RoutineParameter */
    public function first() {
        return parent::find(0);
    }

/** @return RoutineParameter */
    public function last() {
        return parent::last();
    }

/** @return RoutineParameter */
    public function next() {
        return parent::next();
    }

/** @return RoutineParameter */
    public function pop() {
        return parent::pop();
    }

/** @return RoutineParameter */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

    public function save(&$model) {
        die('CollectionRoutineParameter nao possui metodo save em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

/** @return CollectionRoutineParameter */
    public static function retrieve() {
        die('CollectionRoutineParameter nao possui metodo retrieve em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

    public function getFilename() {
        return null;
    }

/** @return RoutineParameter */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
