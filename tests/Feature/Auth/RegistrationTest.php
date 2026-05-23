<?php

test('registration routes are disabled for this hr system', function () {
    $this->get('/register')->assertNotFound();
    $this->post('/register')->assertNotFound();
});

