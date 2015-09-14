#!/usr/bin/expect -f

# connect via scp
spawn scp index.html "$user@$host:."
#######################
expect {
-re ".*es.*o.*" {
exp_send "yes\r"
exp_continue
}
-re ".*sword.*" {
exp_send "$password\r"
}
}
interact
