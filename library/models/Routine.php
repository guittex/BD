<?php

class Routine extends Model {

/** @var string $name */
    protected $name;

/** @var string $type */
    protected $type;

/** @var string $body */
    protected $body;

/** @var string $return */
    protected $return;

/** @var CollectionRoutineParameter $parameters */
    protected $parameters;

/** @return string */
    public function getName() {
        return $this->name;
    }

/** @return string */
    public function getType() {
        return $this->type;
    }

/** @return string */
    public function getBody() {
        return $this->body;
    }

/** @return string */
    public function getReturn() {
        return $this->return;
    }

/** @return CollectionRoutineParameter */
    public function getParameters() {
        return $this->parameters;
    }

/** @param string $name */
    public function setName($name) {
        $this->name = $name;
    }

/** @param string $type */
    public function setType($type) {
        $this->type = $type;
    }

/** @param string $body */
    public function setBody($body) {
        $this->body = $body;
    }

/** @param string $return */
    public function setReturn($return) {
        $this->return = $return;
    }

/** @param CollectionRoutineParameter $parameters */
    public function setParameters($parameters) {
        $this->parameters = $parameters;
    }

}
