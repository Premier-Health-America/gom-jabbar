#!/bin/bash

# list of folders
robot_folders=("orchestrator" "outremona" "verduny" "nordo" "bizar" "oldoporto" "pierre")

# Install node_modules for each folder
for folder in "${robot_folders[@]}"
do
  echo "Setting up $folder..."

  cd $folder
  echo "Installing node_modules in $folder..."
  npm install

  cd ..

  echo "$folder is set up"
done

echo "all nodes_modules are installed"