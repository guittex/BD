<?php

abstract class Model extends PObject {
    
    function __construct($data = null) {
        
        if (is_array($data)) {
            $data = (object) $data;
        }
        
        if (is_object($data)) {
            
            foreach (get_object_vars($data) as $attName => $attValue) {
                $this->set($attName, $attValue);
            }
            
        }
        
    }

// ====================================================================================================================

/** @return Model */
    public function newInstance() {
        return parent::newInstance();
    }

// ====================================================================================================================

/**
 * @desc retorna os atributos da classe filha
 * @return array */
    public function getAttributes() {
        return array_keys(get_class_vars(get_class($this))); // nao funciona com private (apenas var, public e protected)
/*
        $methods = get_class_methods(get_class($this));
        $atts    = [];
        $index   = 0;

        foreach ($methods as $methodName) {

            $Method = new PString($methodName);

            if ($Method->startsWith('set') && $methodName != 'set') {
                $atts[$index] = Util::method2attribute(substr($methodName, 3));
                $index++;
            }

        }

        return $atts;*/
    }

/**
 * @desc retorna o id do modelo. (ou null se id for negativo ou não inteiro)
 * @return int */
    public function getId() {

        $pk = $this->getPKName();
        $id = $this->get($pk);

        if ($pk == 'id' || $pk == 'cd') {
            return (is_numeric($id) && $id > 0 ? $id : null);
        }
        
        return $id;
    }

/**
 * @desc retorna o nome da coluna primary key do modelo atual
 * @return string */
    public function getPKName() {
        return 'id';
    }

/**
 * @desc verifica se o atributo existe na classe filha
 * @param string $attName
 * @return bool */
    public function hasKey($attName) {
        return in_array($attName, $this->getAttributes());
    }

/**
 * @desc seta o $id na coluna primary key da classe filha
 * @param int $id
 * @return void */
    public function setId($id) {
        $this->set($this->getPKName(), $id);
    }

// ====================================================================================================================

/**
 * @param string $attName
 * @return mixed */
    public function get($attName) {

        if ($this->hasKey($attName)) {
            return (isset($this->$attName) && $this->$attName !== '' ? $this->$attName : null);
        }

        return null;
    }

/**
 * @param string $attName
 * @return void */
    public function remove($attName) {
        
        if ($this->hasKey($attName)) {
            unset($this->$attName);
        }

    }

/**
 * @param string $attName
 * @param mixed $attValue
 * @return void */
    public function set($attName, $attValue) {

        if ($this->hasKey($attName)) {
            $this->$attName = $attValue;
        }

    }

}
