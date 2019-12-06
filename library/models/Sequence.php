<?php

class Sequence extends Model {

/** @var string $sequence_name */
    protected $sequence_name;

/** @var int $increment_by */
    protected $increment_by;

/** @var int $last_number */
    protected $last_number;

/** @return string */
    public function getSequence_name() {
        return $this->sequence_name;
    }

/** @return int */
    public function getIncrement_by() {
        return $this->increment_by;
    }

/** @return int */
    public function getLast_number() {
        return $this->last_number;
    }

/** @param string $sequence_name */
    public function setSequence_name($sequence_name) {
        $this->sequence_name = $sequence_name;
    }

/** @param int $increment_by */
    public function setIncrement_by($increment_by) {
        $this->increment_by = $increment_by;
    }

/** @param int $last_number */
    public function setLast_number($last_number) {
        $this->last_number = $last_number;
    }

// ====================================================================================================================

    public function getPKName() {
        return 'sequence_name';
    }

}
