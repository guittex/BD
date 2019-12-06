<?php

abstract class Controller extends PObject {

/** @return Controller */
    public function newInstance() {
        return parent::newInstance();
    }

// ====================================================================================================================

/** 
 * @desc ex: se o nome da classe for 'MotivoBaixaController' returns 'motivo_baixa'
 * @return string */
    public function getAlias() {
        return Singleton::class2attribute($this);
    }

/** 
 * @param string $name
 * @return array */
    public function getArray($name) {
        return $this->getParameter($name, function ($value) {
            return (is_array($value) ? $value : []);
        });
    }

/** 
 * @param string $name
 * @return int */
    public function getInteger($name) {
        return $this->getParameter($name, function ($value) {
            return (is_numeric($value) && $value > 0 ? $value : 0);
        });
    }

/** 
 * @desc retorna um parametro da requisicao
 * @param string $name
 * @param $callback - aplica no valor do parametro e retorna o mesmo
 * @return mixed */
    public function getParameter($name, $callback = null) {

        $get  = (isset($_GET[$name]) ? $_GET[$name]: null);
        $post = (isset($_POST[$name]) ? $_POST[$name]: null);
        $arg  = $_SERVER['REQUEST_METHOD'] == 'POST' ? $post : $get;

        return (is_callable($callback) ? call_user_func($callback, $arg) : $arg);
    }

/** 
 * @desc ex: (se $action == 'mostrar' && $this->getAlias() == 'MotivoBaixaController' returns 'motivo_baixa/mostrar')
 * @param string $action
 * @return string */
    public function getServletAction($action) {

        if (strpos($action, '/') === false) {
            $action = sprintf('%s/%s', $this->getAlias(), $action);
        }

        return $action;
    }

/** 
 * @desc retorna o caminho para o servlet (ex: './index.php?action=listar&id=1')
 * @param string $action (opcional)
 * @param array $args (opcional) - parametros queryString (chave => valor)
 * @return string */
    public function getServletPath($action = null, $args = array()) {

        $path = explode('/', ltrim($_SERVER['PHP_SELF'], '/'));
        array_shift($path); // removendo a pasta do projeto
        $path = implode('/', array_merge([ROOT_PATH], $path));

        return Util::concat($path, (isset($action) ? "?action=" . $this->getServletAction($action) : ''), Util::toQueryString($args));
    }

/**
 * @desc processa uma view, e retorna seu conteudo
 * @throws Exception - se o arquivo da view nao existir 
 * @param string $view
 * @return string */
    public function getView($view) {

        $vName    = self::getServletAction($view);
        $filename = sprintf('%s/%s.phtml', VIEW_PATH, $vName);

        if (!file_exists($filename)) {
            throw new Exception("View {$vName} not exists");
        }

        ob_start();
        include($filename);

        return ob_get_clean();
    }

// ====================================================================================================================

    public function getAttribute($name, $unset = false) {
        return Session::get($name, $unset);
    }

    public function setAttribute($name, $value) {
        Session::set($name, $value);
    }

    public function removeAttribute($name) {
        Session::remove($name);
    }

    public function isAjax() {
        return (self::getParameter('ajax') != null); // TODO: pegar do header (like jquery)
    }

    public function isIframe() {
        return (self::getParameter('ifrm') != null);
    }
    
    public function isLogged() {
        return Session::isLogged();
    }
    
/** @return Usuario */
    public function getSessionUser() {
        $object = self::getAttribute('user');
        return (is_object($object) ? $object : null);
    }
    
    public function getSessionUserAttribute($name) {
        
        $user = self::getSessionUser();
        
        if ($user != null) {
            return $user->get($name);
        }
        
        return null;
    }
    
    public function getSessionUserId() {
        return self::getSessionUserAttribute('id');
    }
    
    public function getSessionUserName() {
        return self::getSessionUserAttribute('username');
    }

// ====================================================================================================================

/** 
 * @desc retorna true se o metodo da requisicao for POST
 * @return bool */
    public function isPost() {
        return ($_SERVER['REQUEST_METHOD'] == 'POST');
    }

/** 
 * @desc redireciona para a url $action com os parametros queryString de $args
 * @param $action
 * @param $args
 * @return void */
    public function sendRedirect($action, $args = array()) {
        header('location:' . $this->getServletPath($action, $args));
        exit;
    }

// ====================================================================================================================

/** 
 * @desc criar um registro (bd ou arquivo) e retorna o modelo criado ou null em falha
 * @return Model */
    abstract public function create(); // TODO: implementar generico pegando dados do form

/**
 * @desc edita um registro (bd ou arquivo) e retorna o modelo salvo ou null em falha
 * @return Model */
    abstract public function update();

/**
 * @desc exclui um registro (bd ou arquivo)
 * @return bool */
    abstract public function delete($id);

}
