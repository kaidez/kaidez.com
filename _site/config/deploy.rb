set :application, "kaidez.com"
set :repository,  "git@github.com:kaidez/kaidez.com.git"

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`


# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

default_run_options[:pty] = true  # Must be set for the password prompt from git to work

set :scm, "git"
set :user, "kaidez.com"  # The server's user for deploys
set :scm_passphrase, "538835"  # The deploy user's password
set :ssh_options, { :forward_agent => true }
set :branch, "master"
set :deploy_to, "/nfs/c02/h08/mnt/46798/domains/"
set :deploy_via, :remote_cache
set :use_sudo, false

role :web, "dev.kaidez.com"
role :app, "dev.kaidez.com"
