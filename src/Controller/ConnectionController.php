<?php

class ConnectionController extends Controller {

    

// ================================================================================================================

    public function create() {
        throw new Exception(sprintf('implementar %s.create()', 'ConnectionController'));
    }
    
    public function update() {
        throw new Exception(sprintf('implementar %s.update()', 'ConnectionController'));
    }
    
    public function delete($id) {
        throw new Exception(sprintf('implementar %s.delete(%s)', 'ConnectionController', $id));
    }
    
}
