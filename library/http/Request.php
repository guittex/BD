<?php

/** @deprecated */
class Request {

    public static function doAction() {

        $args = explode('/', self::getAction());
        $len  = count($args);

        try {

            $def_servlet = 'usuario';
            $def_action  = 'index';

            if ($len == 3) {
                $servlet = array_shift($args);
                $action  = array_shift($args);
                $id      = intval(array_shift($args));
            }
            else if ($len == 2) {
                $servlet = array_shift($args);
                $action  = array_shift($args);
                $id      = 0;
            }
            else if ($len == 1) {
                $servlet = array_shift($args);
                $action  = $def_action;
                $id      = 0;
            }
            else if ($len == 0) {
                $servlet = $def_servlet;
                $action  = $def_action;
                $id      = 0;
            }

            $servlet    = $servlet ? $servlet : $def_servlet;
            $action     = $action  ? $action  : $def_action;
            $controller = self::getController($servlet);

            // TODO: usar try catch e exceptions especificas (criar personalizadas)
            // TODO: mostrar mensagens de erro em um JAlert.show (like modal)

            if ($controller != null) {

                $allowed  = $servlet == 'usuario' && in_array($action, ['logon', 'register']) ? true : $controller->isLogged();

                if (!$allowed) {
                    $servlet = $def_servlet;
                    $action  = 'logon';
                }

                $method   = 'do' . ucfirst($action);
                $callback = array($controller, $method);

                if (is_callable($callback)) {

                    $view = call_user_func_array($callback, [$id]);
                    $type = gettype($view);

                    if ($type == 'array') {
                        echo JSON::parse($view);
                    }
                    else if ($type == 'object') {
                        echo '(', JSON::parse($view), ')'; // se nao colocar os parentes, da erro no ajax
                    }
                    elseif ($type == 'string') {
                        echo $view;
                    }
                    else {
                        throw new Exception(sprintf('Method %s.%s must return an array, object or string, %s returned', get_class($controller), $method, $type));
                    }

                }
                else {
                    throw new Exception(sprintf('Method %s.%s not exists.', get_class($controller), $method));
                }

            }
            else {
                throw new Exception(sprintf('Controller "%s" not exists.', Singleton::getInstanceName($servlet, 'Controller')));
            }

        }
        catch (Exception $e) {
            die($e->getMessage()); // TODO: mostrar numa view bonitinha
        }

    }

/**
 * @desc retorna uma instancia filha da classe Controller baseada em $servlet
 * @param string $servlet - (ex: $servlet == 'motivo_baixa' entao retorna new MotivoBaixaController())
 * @return Controller */
    public static function getController($servlet) {
        return Singleton::getController(Singleton::attribute2class($servlet));
    }

/**
 * @desc retorna o parametro passado na url com a rota da requisicao
 * @return string */
    public static function getAction() {
        return (isset($_REQUEST['action']) ? $_REQUEST['action'] : null);
    }

/** @deprecated */ // obsoleto daqui para baixo
	public static function doAction2() {

		$args = explode('/', self::getAction());
		$len  = count($args);

		try {

			if ($len == 0) {
				$action = '';
				$cid    = 0;
			}
			else if ($len == 1) {
				$action = array_shift($args);
				$cid    = 0;
			}
			else if ($len == 2) {
				$action = array_shift($args);
				$cid    = intval(array_shift($args));
			}

			$action  = $action ? $action : 'index';
			$method  = 'do' . ucfirst($action);
			$allowed = $method == 'doLogon' ? true : self::isLogged();

			if (!$allowed) {
				$method = 'doLogon';
			}

			$callback = array('Request', $method);

			// TODO: voltar a usar Controllers separados
			// TODO: usar try catch e exceptions especificas (criar personalizadas)
			// TODO: mostrar mensagens de erro em um JAlert.show (like modal)

			if (is_callable($callback)) {
				call_user_func($callback);
			}
			else {
				throw new Exception("Method Request.{$method} not exists.");
			}

		}
		catch (Exception $e) {
			die($e->getMessage());
		}

	}

	public static function doLogon() {

	    // TODO: criar metodo doRegister e limpar este
	    // [ chamar doRegister quando nao tiver nenhum usuario na app (colocar passo de confirmar senha)

		$username = self::getParameter('username');
		$cUser    = new CollectionUsuario();

		$has_user = $cUser->has();

		if ($username != null) {

		    $auth = $has_user ? $cUser->auth($username) : true;

			if ($auth) {

				self::setAttribute('auth_user', $username);

				$password = self::getParameter('password');

				if ($password != null) {

				    $ok = $has_user ? $cUser->auth($username, $password) : true;

					if ($ok) {

						if ($has_user == false) {
						    $ok = UsuarioController::create($username, $password) ? $cUser->auth($username, $password) : false;
						}

						if ($ok) {
							self::setAttribute('user', $ok);
							self::sendRedirect('index');
						}
						else {
							self::setAttribute('message', 'Fail on save user');
						}

					}
					else {
						self::setAttribute('message', 'invalid password');
					}

				}
				else {
					self::setAttribute('message', 'enter your password');
				}

			}
			else {
				self::setAttribute('message', 'invalid username');
			}

		}
		else {
			self::setAttribute('message', 'enter your username');
		}

		self::display('logon');
	}

	public static function doLogoff() {
		Session::close();
		self::sendRedirect('logon');
	}

	public static function doIndex() {
		self::display('index');
	}

	public static function doShowConnections() {

		$conns = self::getAdapters();

		while ($linha = $conns->next()) {

			$conn_id      = $linha->getId();
			$conn_label   = $linha->getLabel();
			$conn_adapter = $linha->getAdapter();
//			$icone        = "workbench/database.{$conn_adapter}.png";
			$icone        = "workbench/database.default.png";

			if ($conn_adapter == 'mysql' && !$linha->getSchema()) { // se for conexao mysql sem schema, apenas mostrar databases
			    echo Html::getItem($conn_label, "workbench/database.default.png", "databases_{$conn_id}", "showDatabases", "conn_id={$conn_id}", "", "");
			}
			else {
                echo Html::getItem($conn_label, $icone, "attributes_{$conn_id}", "showAttributes", "conn_id={$conn_id}", "Workspace.open({$conn_id});", "edit delete");
			}

		}

	}

	public static function doShowDatabases() {

	    /** @var CollectionDB $databases */

	    $adapter = self::getAdapter();

		if ($adapter != null) {

		    if ($adapter->getConnection()->getAdapter() == 'mysql' && !$adapter->getConnection()->getSchema()) {

		        $conn_id   = $adapter->getConnection()->getId();
		        $databases = $adapter->getDatabases();

		        if ($databases->length() > 0) {

		            while ($db = $databases->next()) {
		                $dbname = $db->getName();
		                echo Html::getItem($dbname, "workbench/users.png", "attributes_{$conn_id}_{$dbname}", "", "conn_id={$conn_id}&dbname={$dbname}", "", "");
		            }

		        }
		        else {
		            echo '(null)';
		        }

		    }
		    else {
		        echo 'showing mysql with no schema only';
		    }

		}
        else {
			echo 'Connection not found.';
		}

	}

	public static function doShowAttributes() {

		$adapter = self::getAdapter();

		if ($adapter != null) {

			$atts = $adapter->getAttributes();

			foreach ($atts as $label) {

				$a_lower = strtolower($label);
				$conn_id = $adapter->getConnection()->getId();
				$actions = $adapter->allowed() ? '' : '';

				echo Html::getItem($label, "workbench/{$a_lower}_folder.png", "{$a_lower}_{$conn_id}", "show{$label}", "conn_id={$conn_id}", "", $actions);
			}

		}
		else {
			echo 'Connection not found.';
		}

	}

	public static function doShowColumns() {

		$adapter = self::getAdapter();

		if ($adapter != null) {

			$table   = self::getParameter('tablename');
			$all     = $adapter->getColumns($table);
			$conn_id = $adapter->getConnection()->getId();

			if ($all->length() > 0) {

				while ($linha = $all->next()) {

					$label = $linha->getName();
					$str   = $label;
					$type  = strtolower($linha->getType());

					if ($type == 'varchar' || $type == 'varchar2') {
						$type = implode('', [$type, '(', $linha->getSize(), ')']);
					}
					else if ($type == 'int' || $type == 'integer' || $type == 'numeric' || $type == 'decimal' || $type == 'number') {

						if ($linha->getPrecision() > 0) {

							if ($linha->getScale() > 0) {
								$type = sprintf('%s(%s, %s)', $type, $linha->getPrecision(), $linha->getScale());
							}
							else {
								$type = sprintf('%s(%s)', $type, $linha->getPrecision());
							}

						}
						else {

							if ($linha->getSize() > 0) {
								$type = sprintf('%s(%s)', $type, $linha->getSize());
							}

						}

					}

					$label = sprintf('%s %s <span style=color:#9A8350;>[%s]</span>', ($linha->isPrimaryKey() ? '#' : ($linha->isNullable() === true ? '<sup>o</sup>' :  '*')), $label, $type);

					echo Html::getItem($label, "workbench/cols.png", "columns[{$conn_id}][{$table}][{$str}]", '');
				}

			}
			else {
				echo '(no columns selected)';
			}

		}
		else {
		    echo 'Connection not found.';
		}

	}

	public static function doShow($attPlural) {

	    $adapter = self::getAdapter();

	    if ($adapter != null) {

	        $att     = strtolower($attPlural);
	        $method  = 'get' . $attPlural;
			$linhas  = call_user_func_array([$adapter, $method], []);
			$conn_id = $adapter->getConnection()->getId();

			if ($linhas->length() > 0) {

			    while ($model = $linhas->next()) {

			    	$modelName = $attPlural == 'Sequences' ? $model->getSequence_name() : $model->getName();

			        if ($attPlural == 'Tables') {
			            $action = 'showColumns';
			            $params = "conn_id={$conn_id}&tablename={$modelName}";
			        }
			        else {
			            $action = '';
			            $params = '';
			        }

			        echo Html::getItem($modelName, "workbench/{$att}.png", "{$att}[{$conn_id}][{$modelName}]", $action, $params);
				}

			}
			else {
			    echo '(no rows selected)';
			}

	    }
	    else {
	        echo 'no connection selected';
	    }

	}

	public static function doShowTables() {
	    self::doShow('Tables');
	}

	public static function doShowViews() {
		self::doShow('Views');
	}

	public static function doShowSequences() {
		self::doShow('Sequences');
	}

	public static function doShowFunctions() {
		self::doShow('Functions');
	}

	public static function doShowProcedures() {
		self::doShow('Procedures');
	}

	public static function doShowUsers() {
		self::doShow('Users');
	}

	public static function doCreateWorkspace() {
		self::display('workspace');
	}

	public static function doExportar() {
		self::display('exportar');
	}

	public static function doImportar() {
		self::display('importar');
	}

	public static function doAddPagedSQL() {
		echo self::getAdapter()->getPagedSQL("SELECT * FROM ", 1);
	}

	public static function doShowContentAssist() {

		$db   = self::getAdapter();
		$cid  = $db->getConnection()->getId();
		$atts = $db->getAttributes();

		echo '<div align="center">', Html::getTextField('text', "ca_search[$cid]", '', '', null, null, false, "Workspace.filterContentAssist({$cid});"), '</div>';
		printf('<table id="ca_grid[%s]" width="%s" cellpadding="0" cellspacing="0">', $cid, '100%');

		/** @var Collection $all */
		// TODO: arrumar (listar separada e explicitamente)

		foreach ($atts as $attKey => $att_label) {

			$att_name = strtolower($att_label);
			$method   = 'get' . $att_label;
    		$all      = $db->$method(0);

			while ($model = $all->next()) {

				$ds = $attKey == 'sequence' ? $model->getSequence_name() : $model->getName();

				echo '<tr>';
				printf('<td width="24">%s</td>', Html::getImage("workbench/{$att_name}.png"));
				printf('<td class="JItemTree" onclick="Workspace.focusTextArea(%s, \'%s\'); Workspace.getContentAssistObject(%s).hide();">%s</td>', $cid, addslashes($ds), $cid, $ds);
				echo '</tr>';
			}

		}

		echo '</table>';
	}

	public static function doExecuteQuery() {

		// TODO: paginar depois (usar PBar??)

		echo '<style type="text/css">';
		Html::doLoadCSS('styles');
		echo '</style>';

		$query     = Util::removeComments(self::getParameter('query'));
		$delimiter = self::getParameter('delimiter');

		if ($delimiter && strpos($query, $delimiter) !== false) {
			$queries = explode($delimiter, $query);
		}
		else {
			$queries = array($query);
		}

		if (!empty($queries)) {

			$db = self::getAdapter();

			if ($db === null) {
			    die('Id da conexão não foi passado');
			}

			foreach ($queries as $sql) {

				$sql = trim($sql);

				if ($sql) {

					$aux = new PString(strtoupper(substr($sql, 0, 9)));

					if ($aux->startsWith('SELECT ', 'SHOW ', 'DESCRIBE ', 'DESC ')) {

						$fetch = $db->getPDO()->query($sql);

						if ($fetch !== false) {

						    // TODO: implementar paginacao & Database.fetchPages

							$all  = $fetch->fetchAll(PDO::FETCH_OBJ);
							$cols = !empty($all) ? array_keys(get_object_vars($all[0])) : [];

							echo '<p>', Html::datagrid($all, $cols, $db), '</p>';
						}
						else {
							self::showError($db);
						}

					}
					else if ($aux->startsWith('INSERT ', 'UPDATE ', 'DELETE ')) {

						if ($db->allowed()) {

						    $rows = $db->getPDO()->exec($sql);

						    if ($rows !== false) {
                                printf('<p>%s rows affected.</p>', $rows);
						    }
						    else {
						        self::showError($db);
						    }

						}
						else {
							echo '<p>cannot execute DML commands in reserved schemas.</p>';
						}

					}
					else {

						if ($db->allowed()) {

							$rows = $db->getPDO()->exec($sql);

							if ($rows !== false) {
							    echo "<p>{$rows} rows affected.</p>";
							}
							else {
								self::showError($db);
							}

						}
						else {
							echo '<p>cannot execute commands in reserved schemas.</p>';
						}

					}

				}

			}

		}

	}

// ====================================================================================================================

/**
 * @desc mostra na tela o erro gerado pela ultima consulta sql
 * @param Database $database
 * @return void */
	public static function showError($database) {

	    $debug = array_reverse($database->getPDO()->errorInfo());

	    echo $debug[0];
	}

// ====================================================================================================================

/** @return CollectionConnection */
	public static function getAdapters() {

	    $collection = CollectionConnection::retrieve();
	    $collection->where('enabled', true);
	    $collection->orderby('label');

	    return $collection;
	}

/** @return Database */
	public static function getAdapter($cid = null) {

	    $cid     = assigned($cid) ? $cid : self::getAdapterId();
	    $adapter = null;

	    if ($cid > 0) {

	        $connection = self::getAdapters()->getBy('id', $cid);

	        if ($connection != null) {

                if ($connection->getAdapter() == 'mysql') {
                	$adapter = new MySQL($connection);
                }
                else if ($connection->getAdapter() == 'oracle') {
                    $adapter = new Oracle($connection);
                }
                else if ($connection->getAdapter() == 'postgres') {
                    $adapter = new PostgreSQL($connection);
                }
                else if ($connection->getAdapter() == 'mssql') {
                    $adapter = new SQLServer($connection);
                }
                else {
                    die(sprintf('Adapter (%s) not implemented.', $connection->getAdapter()));
                }

	        }

	    }

	    return $adapter;
	}

	public static function getAdapterId() {
	    return self::getInteger('conn_id');
	}

	public static function getServletAction($action) {
	    return $action;
	}

	public static function getServletPath($action = null, $args = array()) {
	    return sprintf('%s/index.php%s%s', ROOT_PATH, (isset($action) ? "?action=" . self::getServletAction($action) : ''), self::toJSArgs($args));
	}

	public static function getView($view) {
	    return self::getServletAction($view);
	}

	public static function sendRedirect($action, $args = array()) {
	    header('location:' . self::getServletPath($action, $args));
	    exit;
	}

/** @deprecated */
	public static function toJSArgs($args) {
	    return Util::toQueryString($args);
	}

	public static function display($view) {

	    $filename = sprintf('%s/%s.phtml', VIEW_PATH, self::getView($view));

	    if (file_exists($filename)) {
	        include($filename);
	    }
	    else {
	        echo "View {$filename} not exists.";
	    }

	}

	public static function setAttribute($name, $value) {
	    Session::set($name, $value);
	}

	public static function getAttribute($name, $unset = false) {
	    return Session::get($name, $unset);
	}

	public static function removeAttribute($name) {
	    Session::remove($name);
	}

	public static function cleanSession() {
	    Session::close();
	}

	public static function isAjax() {
	    return (self::getParameter('ajax') != null); // TODO: pegar do header (like jquery)
	}

	public static function isIframe() {
	    return (self::getParameter('ifrm') != null);
	}

	public static function isLogged() {
	    return Session::isLogged();
	}

/** @return Usuario */
	public static function getSessionUser() {
	    $object = self::getAttribute('user');
	    return (is_object($object) ? $object : null);
	}

	public static function getSessionUserAttribute($name) {

	    $user = self::getSessionUser();

	    if ($user != null) {
	        return $user->get($name);
	    }

	    return null;
	}

	public static function getSessionUserId() {
	    return self::getSessionUserAttribute('id');
	}

	public static function getSessionUserName() {
	    return self::getSessionUserAttribute('username');
	}

	public static function getParameter($name) {

	    $get  = (isset($_GET[$name]) ? $_GET[$name]: null);
	    $post = (isset($_POST[$name]) ? $_POST[$name]: null);
	    $arg  = $_SERVER['REQUEST_METHOD'] == 'POST' ? $post : $get;

	    return $arg;
	}

	public static function getArray($name) {

	    $array = self::getParameter($name);

	    if (!is_array($array)) {
	        $array = array();
	    }

	    return $array;
	}

	public static function getInteger($name) {
	    return intval(self::getParameter($name));
	}

}
