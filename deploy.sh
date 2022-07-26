#!/bin/sh

# Directory with the react app in it.
REACT_BASE_PATH="system-stats-app"
# Directory the build output is stored in.
REACT_BUILD_ROOT="system-stats-app/build"
# Flask app static folder
DEST_STATIC_PATH="app/static"
# Flask app templates folder.
DEST_TEMPLATES_PATH="app/templates"

# Running the npm build command. produces build/
echo "Building App.."
cd $REACT_BASE_PATH
CMD=$(npm run build)
echo "Build Finished"

# We CD'd into the react app to build it. we need to move back to the repo base.
cd ..

# List of files that are in the react build directory.
FILES=$(find $REACT_BUILD_ROOT -maxdepth 1 -not -type d)


# Clean out the flask apps static folder before writing to it.
echo "Preparing the dest static folder.."
rm -rf "$DEST_STATIC_PATH/*"
echo "Prep complete."

# Copy all the files in the react app build output to the flask app static folder.
echo "Copying static files from npm build into flask app static folder."
cp -r "$REACT_BUILD_ROOT/static/"* $DEST_STATIC_PATH
for f in $FILES
do 
  echo "Copying ${f} into $DEST_TEMPLATES_PATH."
  cp $f $DEST_TEMPLATES_PATH
done
echo "Copy complete."


# Move all the template files that were copid over into the static folder.
echo "Moving template files.."
mv $DEST_TEMPLATES_PATH/manifest.json $DEST_STATIC_PATH/
mv $DEST_TEMPLATES_PATH/favicon.ico $DEST_STATIC_PATH/
mv $DEST_TEMPLATES_PATH/asset-manifest.json $DEST_STATIC_PATH/
mv $DEST_TEMPLATES_PATH/logo192.png $DEST_STATIC_PATH/
mv $DEST_TEMPLATES_PATH/logo512.png $DEST_STATIC_PATH/
mv $DEST_TEMPLATES_PATH/robots.txt $DEST_STATIC_PATH/
echo "Move complete."
