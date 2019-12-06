<?php

abstract class Collection extends PObject {

/** @var array $val Array contendo os elementos do tipo object genéricos. */
    protected $val;
/** @var int $needle ponteiro para percorrer o array. */
    protected $needle;

/** @param array $haystack */
    function __construct(array $haystack = []) {

        $this->val    = [];
        $this->needle = -1;

        foreach ($haystack as $object) {
            $this->add($object);
        }

    }

    function __toString() {
        echo JSON::parse($this->val);
    }

// ====================================================================================================================

/** @return Collection */
    public function newInstance() {
        return parent::newInstance();
    }

// ====================================================================================================================

/**
 * @desc adiciona um elemento na collection.
 * @param object $object
 * @return void */
    public function add(Model $object) {
        $this->val[] = $object;
    }

/**
 * @desc retorna o elemento atual ou nulo.
 * @return object */
    public function current() {
        return $this->find($this->needle);
    }

/**
 * @desc itera a collection e executa uma função callback em cada elemento.
 * @param callable $callback
 * @return void */
    public function each($callback) {

        foreach ($this->val as $index => $object) {
            call_user_func_array($callback, [$index, $object, $this]);
        }

    }

/**
 * @desc checa se um elemento existe na collection.
 * @param int $index chave a ser checada.
 * @return bool */
    public function exists($index) {
        return isset($this->val[$index]);
    }

/**
 * @desc retorna o elemento da collection especificado em $index ou nulo se não encontrado.
 * @param int $index
 * @return object */
    public function find($index) {
        return ($this->exists($index) ? $this->val[$index] : null);
    }

/**
 * @desc retorna o primeiro elemento ou nulo se collection estiver vazia.
 * @return object */
    public function first() {
        return $this->find(0);
    }

/**
 * @desc retorna os elementos de uma coluna especificada em $columnName. retorna um array vazio se a coluna não existir no elemento.
 * @param string $columnName
 * @param bool $preserveKeys retorna o array com as chaves preservadas.
 * @return array */
    public function getColumn($columnName, $preserveKeys = false) {

        $array = array();

        foreach ($this->val as $index => $linha) {

        	if (method_exists($linha, 'get')) {
        		$el = $linha->get($columnName);
        	}
        	else {
        		$el = isset($linha->$columnName) ? $linha->$columnName : null;
        	}

            if ($preserveKeys) {
                $array[$index] = $el;
            }
            else {
                $array[] = $el;
            }

        }

        return $array;
    }

/**
 * @desc retorna o maior inteiro entre as colunas específicas em $attName (a coluna $attName deve ser do tipo integer ou retorna 0)
 * @return int */
    public function getMax($attName) {

        /** @var Model $model */

        $values = [];
        $index  = 0;
        $id     = 0;

        for ($index = 0, $len = $this->length(); $index < $len; $index++) {

            $model = $this->val[$index];
            $id    = $model->get($attName);

            if (is_numeric($id)) {
                $values[] = $id;
            }

        }

        rsort($values);

        return (isset($values[0]) ? ($values[0]) : 0);
    }

/**
 * @desc retorna o ultimo elemento ou nulo se collection estiver vazia.
 * @return object */
    public function last() {
        return $this->find(($this->length() - 1));
    }

/**
 * @desc retorna a quantidade de elementos da collection.
 * @return int */
    public function length() {
        return count($this->val);
    }

/**
 * @desc retorna o proximo elemento ou nulo se não for encontrado ou collection estiver vazia.
 * @return object */
    public function next() {
        $this->needle++;
        return $this->current();
    }

/**
 * @desc ordena os elementos da collection pelas colunas especificadas em $columnName.
 * @param string|string[] $columns
 * @example orderby(string $columnName)
 * @example orderby(string[] $columns)
 * @return void */
    public function orderby($columns) {

        $type = gettype($columns);

        if ($type == 'array') {

            foreach ($columns as $columnName) {
                $this->orderby($columnName);
            }

        }
        elseif ($type == 'string') {

            $split = explode(' ', $columns);

            if (isset($split[1])) {
                $orderby    = strtolower($split[1]);
                $columnName = $split[0];
            }
            else {
                $orderby    = 'asc';
                $columnName = $columns;
            }

            $aux  = array();
            $caux = array_keys($this->getColumn($columnName, true));

            // TODO: implementar ordenação por string data

            if ($orderby == 'desc') {
                arsort($caux);
            }
            else {
                asort($caux);
            }

            foreach ($caux as $index) {
                $aux[] = $this->val[$index];
            }

            $this->val = $aux;
        }

    }

/**
 * @desc remove o ultimo elemento e retorna-o. retorna null se collection estiver vazia.
 * @return object */
    public function pop() {
        return array_pop($this->val);
    }

/**
 * @desc remove um elemento da collection.
 * @param int $index indice do elemento a ser removido.
 * @return Collection */
    public function remove($index) {

    	if ($this->exists($index)) {

    		$linha = $this->val[$index];

    		unset($this->val[$index]);
    		$this->update();

    		if (is_callable($callback)) {
    			return call_user_func_array($callback, [$linha, $index, $this]);
    		}

    	}

    	return $this;
    }

/**
 * @desc substitui um elemento na collection.
 * @param int $index posição na collection a ser substituida.
 * @param object $object elemento a ser substituido na posição $index
 * @return Collection */
    public function replace($index, $object) {

        if ($this->exists($index)) {
            $this->val[$index] = $object;
        }

        return $this;
    }

/**
 * @desc retorna o indice de um elemento na collection pesquisando por $attName e $attValue (retorna -1 se a pesquisa não encontrar registro)
 * @param string $attName
 * @param string $attValue
 * @return int */
    public function searchIndex($attName, $attValue) {

        /** @var Model $model */

        $index = -1;

        for ($x = 0, $len = $this->length(); $x < $len; $x++) {

            $model = $this->val[$x];

            if ($model->get($attName) == $attValue) {
                $index = $x;
                break;
            }

        }

        return $index;
    }

/**
 * @desc remove o primeiro elemento e retorna-o. retorna null se collection estiver vazia.
 * @return object */
    public function shift() {
        return array_shift($this->val);
    }

/** @return stdclass[] */
    public function toArray() {

        /** @var Model $model */

        $array = [];

        for ($i = 0, $len = $this->length(); $i < $len; $i++) {

            $model  = $this->val[$i];
            $atts   = $model->getAttributes();
            $object = [];

            foreach ($atts as $attName) {
                $object[$attName] = $model->get($attName);
            }

            $array[] = (object) $object;
        }

        return $array;
    }

/**
 * @desc atualiza as chaves do array.
 * @return void */
    protected function update() {

        $novo = [];

        foreach ($this->val as $object) {
            $novo[] = $object;
        }

        $this->val = $novo;
    }

/**
 * @param string $searchField
 * @param mixed $searchValue
 * @return void */
    public function where($searchField, $searchValue) {

        /** @var Model $model */

        for ($i = 0, $len = $this->length(); $i < $len; $i++) {

            $model = $this->val[$i];

            if ($model->get($searchField) !== $searchValue) {
                unset($this->val[$i]);
            }

        }

        $this->update();
    }

// ====================================================================================================================

/**
 * @desc lê um arquivo .json com os elementos da collection
 * @return Collection */
    protected function read() {

        $array = JSON::read($this->getFilename());

        if (is_array($array)) {

            foreach ($array as $object) {
                $this->add($this->getModel($object));
            }

        }

        return $this;
    }

/**
 * @desc grava num arquivo .json os elementos da collection
 * @return bool */
    public function write() {
        return JSON::write($this->getFilename(), $this->toArray(), true); // nao funciona com propriedades protected ou private, por isso o toArray
    }

// ====================================================================================================================

/**
 * @desc retorna o caminho do arquivo onde contem os elementos (formato JSON)
 * @return string */
    abstract public function getFilename();


// ====================================================================================================================

/**
 * @desc retorna uma nova instancia do modelo pertencente a Collection atual. ex: CollectionCarro retorna new Carro()
 * @example getModel([array|stdClass $data])
 * @param array|stdClass $data - valores para popular o model no construtor
 * @return Model */
    public function getModel() {

        $model = str_replace('Collection', '', get_class($this));

        if (func_num_args() > 0) {
            $model = new $model(func_get_arg(0));
        }
        else {
            $model = new $model();
        }

        return $model;
    }

// ====================================================================================================================

/** @return Model */
    public function getBy($attName, $attValue) {

        /** @var Model $model */

        $object = null;

        for ($x = 0, $len = $this->length(); $x < $len; $x++) {

            $model = $this->val[$x];

            if ($model->get($attName) == $attValue) {
                $object = $model;
                break;
            }

        }

        return $object;
    }

// ====================================================================================================================

/**
 * @desc remove um elemento do arquivo JSON
 * @example delete(int $id)
 * @param int $id
 * @return void */
    public function delete($id) {

        $collection = $this->read(); // TODO: buscar antes???
        $model      = $this->getModel();
        $index      = $collection->searchIndex($model->getPKName(), $id);

        if ($index < 0) {
            throw new Exception(sprintf('registro %s não localizado para exclusão em %s.delete', $id, get_class($this)));
        }

        $collection->remove($index);

        return $collection->write();
    }

/**
 * @desc checa se existe algum elemento no arquivo
 * @return bool */
    public function has() {
        return ($this->read()->length() > 0);
    }

/**
 * @desc salva o objeto no arquivo json
 * @example save(Model $model)
 * @param Model $model
 * @return bool */
    public function save(&$model) {

        $type = gettype($model);

        if ($type == 'object') {

            $pk    = $model->getPKName();
            $id    = $model->getId();
            $all   = $this->read();
            $index = $all->searchIndex($pk, $id);

            if ($id == null) { // insert
                $model->setId(($all->getMax($pk) + 1));
                $all->add($model);
            }
            else { // update

                if ($index > -1) {
                    $all->replace($index, $model); // buscar index do elemento pelo id e substituir (replace) na collection
                }
                else {
                    throw new Exception(sprintf('model (%s) não localizado para atualização em metodo %s::save', $id, get_class($this)));
                }

            }

            return $all->write();
        }

        throw new Exception(sprintf('metodo %s::save espera parametro 1 ser Model, foi passado %s', get_class($this), $type));
    }

}
