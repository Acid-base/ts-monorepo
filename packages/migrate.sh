#!/bin/bash

# Set the root directory (where the 'foo', 'bar', and 'components' directories are)
root_dir="."

# Set the source subdirectory within each directory (e.g., 'src')
source_subdir="src"

# Set the target directory for the converted files (e.g., '.')
target_dir="."

# Iterate over the directories
for directory in foo bar components; do
  # Construct the source path for the directory
  source_path="$root_dir/$directory/$source_subdir"

  # Recursively find all .js, .jsx, .mjs, and .cjs files in the source directory
  # while ignoring node_modules directories
  find "$source_path" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.mjs" -o -name "*.cjs" \) -not -path "*/node_modules/*" -print0 | while IFS= read -r -d $'\0' file; do
    # Construct the target path by replacing the source path and changing the extension
    target_path="$file"
    target_path="${target_path//"$source_path"/$target_dir}"
    target_path="${target_path/\.js/\.ts}"
    target_path="${target_path/\.jsx/\.tsx}"
    target_path="${target_path/\.mjs/\.ts}"
    target_path="${target_path/\.cjs/\.ts}"

    # Create the target directory if it doesn't exist
    mkdir -p "$(dirname "$target_path")"

    # Copy the file to the target path
    cp "$file" "$target_path"
  done
done

echo "File conversion completed."