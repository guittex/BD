<?php

class CollectionView extends Collection {
    
/** @param View $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return View */
    public function current() {
        return parent::current();
    }

/** @return View */
    public function find($index) {
        return parent::find($index);
    }

/** @return View */
    public function first() {
        return parent::find(0);
    }

/** @return View */
    public function last() {
        return parent::last();
    }

/** @return View */
    public function next() {
        return parent::next();
    }

/** @return View */
    public function pop() {
        return parent::pop();
    }

/** @return View */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

    public function save(&$model) {
        die('CollectionView nao possui metodo save em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

/** @return CollectionView */
    public static function retrieve() {
        die('CollectionView nao possui metodo retrieve em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

    public function getFilename() {
        return null;
    }

/** @return View */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
