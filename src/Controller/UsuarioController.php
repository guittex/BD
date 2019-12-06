<?php

class UsuarioController extends Controller {

    public function doRegister() {

        $username = $this->getParameter('username');
        
        if ($this->isPost()) {

            if ($username != null) {

                $this->setAttribute('auth_user', $username);

                $password = $this->getParameter('password');

                if ($password != null) {

                    $this->setAttribute('auth_pass', $password);

                    $confirm = $this->getParameter('confirm');

                    if ($confirm != null) {

                        if ($password === $confirm) {

                            $ok = $this->create($username, $password);

                            if ($ok !== null) {

                                $this->removeAttribute('auth_user');
                                $this->removeAttribute('auth_pass');

                                $this->setAttribute('user', $ok);
                                $this->sendRedirect('index');
                            }
                            else {
                                $this->setAttribute('message', 'Fail on save user');
                            }

                        }
                        else {
                            $this->setAttribute('message', 'the passwords are differents');
                        }

                    }
                    else {
                        $this->setAttribute('message', 'confirm your password');
                    }

                }
                else {
                    $this->setAttribute('message', 'enter your password');
                }

            }
            else {
                $this->setAttribute('message', 'enter your username');
            }

        }
        else {
            $this->removeAttribute('auth_user');
            $this->removeAttribute('auth_pass');
        }

        return $this->getView('register');
    }

    public function doLogon() {

        $username = $this->getParameter('username');
        $cUser    = new CollectionUsuario();

        if ($username != null) {

            $auth = $cUser->auth($username);

            if ($auth) {

                $this->setAttribute('auth_user', $username);

                $password = $this->getParameter('password');

                if ($password != null) {
                    
                    $ok = $cUser->auth($username, $password);
                    
                    if ($ok) {

                        $ok = $cUser->auth($username, $password);

                        if ($ok) {
                            $this->setAttribute('user', $ok);
                            $this->sendRedirect('index');
                        }
                        else {
                            $this->setAttribute('message', 'Fail on save user');
                        }
                        
                    }
                    else {
                        $this->setAttribute('message', 'invalid password');
                    }
                    
                }
                else {
                    $this->setAttribute('message', 'enter your password');
                }

            }
            else {
                $this->setAttribute('message', 'invalid username');
            }

        }
        else {

            $this->setAttribute('message', 'enter your username');

            if (!$cUser->has()) {
                return $this->getView('register');
            }

        }

        return $this->getView('logon');
    }
    
    public function doLogoff() {
        Session::close();
        $this->sendRedirect('logon');
    }

    public function doIndex() {
        return $this->getView('index');
    }

// ================================================================================================================

    public function create() {

        $args       = func_get_args();
        $username   = $args[0];
        $password   = $args[1];
        $navigator  = isset($args[2]) && $args[2] ? $args[2] : 'right';

	    $collection = new CollectionUsuario();
        $model      = new Usuario();

        $model->setUsername($username);
        $model->setPassword(md5($password));
        $model->setNavigator($navigator);

        if ($collection->save($model)) {
            $model->remove('password');
            return $model;
        }

        return null;
    }
    
    public function update() {
        throw new Exception(sprintf('implementar %s.update()', 'UsuarioController'));
    }
    
    public function delete($id) {
        throw new Exception(sprintf('implementar %s.delete(%s)', 'UsuarioController', $id));
    }
    
}
