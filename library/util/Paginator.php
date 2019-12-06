<?php

class Paginator {
	
	private $total, $from, $to, $pages, $page, $all;

	public function getTotal() {
		return $this->total;
	}

	public function getFrom() {
		return $this->from;
	}

	public function getTo() {
		return $this->to;
	}

	public function getPages() {
		return $this->pages;
	}

	public function getPage() {
		return $this->page;
	}

	public function getAll() {
		return $this->all;
	}

	public function setTotal($total) {
		$this->total = $total;
	}

	public function setFrom($from) {
		$this->from = $from;
	}

	public function setTo($to) {
		$this->to = $to;
	}

	public function setPages($pages) {
		$this->pages = $pages;
	}

	public function setPage($page) {
		$this->page = $page;
	}

	public function setAll($all) {
		$this->all = $all;
	}

}
