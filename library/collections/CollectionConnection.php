<?php

class CollectionConnection extends Collection {
    
/** @param Connection $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return Connection */
    public function current() {
        return parent::current();
    }

/** @return Connection */
    public function find($index) {
        return parent::find($index);
    }

/** @return Connection */
    public function first() {
        return parent::find(0);
    }

/** @return Connection */
    public function last() {
        return parent::last();
    }

/** @return Connection */
    public function next() {
        return parent::next();
    }

/** @return Connection */
    public function pop() {
        return parent::pop();
    }

/** @return Connection */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

/** @return CollectionConnection */
    public static function retrieve() {
        $collection = new CollectionConnection();
        return $collection->read();
    }

// ====================================================================================================================

    public function getFilename() {
        return (UTIL_PATH . '/connections.json');
    }

/** @return Connection */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
