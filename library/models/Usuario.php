<?php

/** @desc representa o Usuario da aplicacao hendl-dbadmin */
class Usuario extends Model {

/** @var int $id */
	protected $id;

/** @var string $username */
	protected $username;

/** @var string $password */
	protected $password;

/** @var string $navigator */
	protected $navigator;

/** @return string */
	public function getUsername() {
	    return $this->username;
	}

/** @return string */
	public function getPassword() {
	    return $this->password;
	}

/** @return string */
	public function getNavigator() {
	    return $this->navigator;
	}

/** @param string $username */
    public function setUsername($username) {
        $this->username = $username;
    }

/** @param string $password */
    public function setPassword($password) {
        $this->password = $password;
    }

/** @param string $navigator */
    public function setNavigator($navigator) {
        $this->navigator = $navigator;
    }

}
