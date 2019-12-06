<?php

class CollectionRoutine extends Collection {
    
/** @param Routine $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return Routine */
    public function current() {
        return parent::current();
    }

/** @return Routine */
    public function find($index) {
        return parent::find($index);
    }

/** @return Routine */
    public function first() {
        return parent::find(0);
    }

/** @return Routine */
    public function last() {
        return parent::last();
    }

/** @return Routine */
    public function next() {
        return parent::next();
    }

/** @return Routine */
    public function pop() {
        return parent::pop();
    }

/** @return Routine */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

    public function save(&$model) {
        die('CollectionRoutine nao possui metodo save em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

/** @return CollectionRoutine */
    public static function retrieve() {
        die('CollectionRoutine nao possui metodo retrieve em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

    public function getFilename() {
        return null;
    }

/** @return Routine */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
