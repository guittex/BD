<?php

class Singleton {

/** 
 * @desc ex: ($string == 'motivo_baixa') returns 'MotivoBaixa'
 * @param string $string
 * @return string */
    public static function attribute2class($string) {
        return str_replace(' ', '', ucwords(str_replace('_', ' ', $string)));
    }

/** 
 * @desc ex: $class == 'MotivoBaixa' returns 'motivo_baixa'
 * @param Collection|Controller|Model|string $class ($class nao precisa ter sufixo)
 * @return string */
    public static function class2attribute($class) {
        
        $class = self::getInstanceName($class, '');
        $atts  = [substr($class, 0, 1)];
        $bigs  = range('A', 'Z');
        
        for ($i = 1, $len = strlen($class); $i < $len; $i++) {
            
            $c = substr($class, $i, 1);
            
            if (in_array($c, $bigs)) {
                $atts[] = '_';
            }
            
            $atts[] = $c;
        }
        
        return strtolower(implode('', $atts));
    }

/**
 * @desc retorna o nome da classe baseado em $class e $suffix (ex: se ($class == 'MotivoBaixa' & $suffix == 'Collection') returns 'CollectionMotivoBaixa)
 * @param Collection|Controller|Model|string $class ($class nao precisa ter sufixo)
 * @param string $suffix
 * @return string */
    public static function getInstanceName($class, $suffix) {

        $class = str_replace(['Collection', 'Controller', 'Model'], '', (is_object($class) ? get_class($class) : $class));
        
        if ($suffix == 'Collection') {
            $class = $suffix . $class; // ex: CollectionUsuario
        }
        else {
            $suffix = $suffix != 'Model' ? $suffix : ''; // nao estou usando sufixo Model nos models deste projeto, se for usar, apagar esta linha
            $class  = $class . $suffix; // ex: UsuarioController
        }

        return $class;
    }

/** 
 * @desc retorna uma instancia unica baseado em $class e $suffix (ex: se ($class == 'MotivoBaixa' & $suffix == 'Collection') returns new CollectionMotivoBaixa())
 * @param Collection|Controller|Model|string $class ($class nao precisa ter sufixo)
 * @param string $suffix 
 * @return PObject */
    public static function getInstance($class, $suffix) {

        $class  = self::getInstanceName($class, $suffix);
        $parent = get_parent_class($class);
        $grandf = get_parent_class($parent);

        if ($grandf === 'PObject') { // a classe $suffix deve herdar PObject => Filho > $suffix > PObject

            if ($suffix === $parent) { // o objeto a ser criado deve herdar a classe $suffix

                if (!(isset($GLOBALS[APP_SINGLETON_ATTRIBUTE]) && is_array($GLOBALS[APP_SINGLETON_ATTRIBUTE]))) {
                    $GLOBALS[APP_SINGLETON_ATTRIBUTE] = [];
                }

                if (!isset($GLOBALS[APP_SINGLETON_ATTRIBUTE][$class])) {
                    $GLOBALS[APP_SINGLETON_ATTRIBUTE][$class] = new $class();
                }

                return $GLOBALS[APP_SINGLETON_ATTRIBUTE][$class];
            }
            else {
                throw new Exception("{$class} deve herdar a classe {$suffix}");
            }

        }
        else {
            throw new Exception("{$suffix} deve herdar a classe {$grandf}");
        }

        return null;
    }
    
/**
 * @desc retorna uma Collection filha (instancia unica [Singleton]) correspondente a classe passada em $class. (ex: ($class == 'MotivoBaixaController') returns new CollectionMotivoBaixa())
 * @param Collection|Controller|Model|string $class ($class nao precisa ter sufixo)
 * @return Collection */
    public static function getCollection($class) {
        return self::getInstance($class, 'Collection');
    }

/**
 * @desc retorna um Controller filho (instancia unica [Singleton]) correspondente a classe passada em $class. (ex: ($class == 'CollectionMotivoBaixa') returns new MotivoBaixaController())
 * @param Collection|Controller|Model|string $class ($class nao precisa ter sufixo)
 * @return Controller */
    public static function getController($class) {
        return self::getInstance($class, 'Controller');
    }

/** 
 * @desc retorna um Model filho (instancia unica [Singleton]) correspondente a classe passada em $class. (ex: ($class == 'CollectionMotivoBaixa') returns new MotivoBaixaModel())
 * @param Collection|Controller|Model|string $class ($class nao precisa ter sufixo)
 * @return Model */
    public static function getModel($class) {
        return self::getInstance($class, 'Model');
    }
    
}
