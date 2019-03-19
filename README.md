# CLI for Artists + Designers
[Command-Line Interface (CLI)](https://en.wikipedia.org/wiki/Command-line_interface) is a great way to perform common tasks involving digital media (converting, cropping, downloading, merging, ...) without the need for a graphical user interface (GUI). These tools are open-source (free) and written to perform single tasks really well. Once you install the following tools, you'll be surprised how rarely you need some big software programs for many of your image/movie/sound tasks.

Workflow: Once setting the working directory/folder to use, you write single line commands, which start with the name of the tool to use, followed by parameters that set the input file, options and output destination. All commands are followed by the `ENTER` key to run.

This guide is written for MacOS, where the built-in CLI tool is known as Terminal, sitting in your Utilities folder. 

### TOC
- [CLI Basics](#cli-basics) - command-line intro
- [Homebrew](#homebrew) - package manager
- [Imagemagick](#imagemagick) - images
- [FFmpeg](#ffmpeg) - movies
- [youtube-dl](#youtube-dl) - download media

## CLI Basics
There's just a few commands/tips you really need to know at first.  

**_note:_** _directory means folder_

- `cd` (change directory), used to set working dir for accessing files.  

- `../` (parent folder), used w/ `cd` to navigate one directory up.   

- `ls` (list), lists all files within working dir.  

- `UP ARROW` (history), toggle through previous commands.  

- `TAB` autocomplete commands / directory names

- `say hello world` (text-to-speech), never gets old...  

- `man` (manual), used before name of tool, to learn about its options.

- `pwd` prints the name of the working directory

- `touch` followed by a filename + extension creates an empty file of that kind 

  ```bash
  touch index.html # creates an empty file called index.html
  ```

* `mkdir` followed by a name, creates an empty directory

  ```bash
  mkdir new_directory # creates empty folder
  cd new_directory # change to my_folder 
  touch index.html # creates an empty file called index.html
  touch style.css # creates an empty file called style.css
  mkdir js # creates an empty directory called js
  touch js/script.js # creates an empty script.js file inside the js directory
  
  new_directory
  ├── js
  │   └── script.js
  ├── index.html
  └── style.css
  ```

* `python -m SimpleHTTPServer 8000` creates a server on port 8000 `localhost:8000` it is possible to set any available port number

### Set active directory
You always set the folder you're working in, either for processing files in that folder or having items download to that directory.
> cd *path/to/directory*

The easiest way to do this is just type `cd` + `spacebar`, then drag and drop the folder into the Terminal window. Hit `Enter` and you're now working in that folder. You can test by listing the contents with `ls`.

### Careful
Use caution if following guides with the following commands  
- `rm` + `rmdir` (remove + remove directory), permanently removes files!  
- `sudo` (root), sometimes needed for system changes, but gives admin privledges.


## Homebrew
[Homebrew](https://brew.sh) is a package manager.  
They keep an [updated list](https://formulae.brew.sh/) of tools and make their installation super easy.

### Install  
copy + paste into the following into Terminal: 
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"  

It will inform you what it needs to install, ask you to press `ENTER` to continue, then request your computer's password (only time it should be needed). *FYI: you won't see your password while typing, just press `ENTER` when done.*

### Usage
After it's installed, to install any package, you just enter:  
> brew install *packagename*

## Imagemagick
[Imagemagick](https://www.imagemagick.org) is for images.   
Amazing at batch processing to a directory of images.
### Install
> brew install imagemagik

### Usage
Once installed, you call it (on MacOS) with `convert`,  
then pass any number of input and output arguments.

### GIF from directory
Navigate to folder of images, as described above in *Set active directory*. 

Grab all \*.png or \*.jpg and output GIF
> convert *.png -loop 0 test.gif


* `convert` launches Imagemagick  
* `*.png` grabs for all pngs  
* `-loop 0` sets infinite looping  
* `test.gif` name of output file (customize).

### Resize in batch
Navigate to folder of images, as described above in *Set active directory*. 

Create folder for output using `mkdir` (make directory)  
> mkdir thumbs

Batch process using `mogrify`, » 
> mogrify -resize 128x128 -quality 100 -path ./thumbs *.jpg  

* `mogrify` launch batch tool of Imagemagick,   
* `-resize #x#` resizes (can also use percentages)  
* `-quality 100` sets compression  
* `-path ./thumbs` specifies where to put outputs  
* `*.jpg` specifies fileformat of output. 

### Additional Links
- [Imagemagick CLI](https://imagemagick.org/script/command-line-processing.php)
- [Mogrify Guide](https://imagemagick.org/script/mogrify.php)

## FFmpeg
[FFmpeg](https://www.ffmpeg.org) is for movies.  
It's the underlying tech beneath most online/offline media converters.

### Install
> brew install ffmpeg

### Usage
Once installed, call with `ffmpeg`,
pass `-i` input file, options, output file.
> ffmpeg -i myfile.mov myfile.mp4

### Convert format
It's really as easy as above! You don't even *need* to set an active directly, you can also just type `ffmpeg -i ` then drag + drop original file, drag + drop again, replace suffix with new filetype.
> ffmpeg -i *input_file* *output_file.filetype*

### Trim
Super useful to extract moment from movie 
> ffmpeg -ss 10 -i input.mp4 -c copy -t 15 output.mp4

* `ffmpeg` launches FFmpeg
* `-ss ##` sets starting point in sec
* `-i input.mp4` sets input file
* `-c copy` creates new file, instead of modifying original
* `-t ##` duration for new clip in sec (use `-to ##` for time in clip)
* `output.mp4` name/path for new output file

### Export frames
Want to build a contact sheet of frames per every second?  

Navigate to folder of images, as described above in *Set active directory*. 

Create folder for output using `mkdir` (make directory)  
> mkdir out

Set input file, frames per second for output, file path/type
> ffmpeg -i input.mp4 -vf fps=1 out/out%03d.png

* `-vf fps=1` exports # frames per second

### Speed
Useful to speed up long screen-recordings.

> ffmpeg -i input.mp4 -filter:v "setpts=0.5*PTS" output.mp4

* `-filter:v "setpts=0.5*PTS"` 0.5 = 50% speed, 1.0 = normal, 1.5 = 150%

### Additional Links
- [FFmpeg CLI guide](https://www.ffmpeg.org/ffmpeg.html)
- [Werner Robitza FFmpeg guide](http://slhck.info/ffmpeg-encoding-course/#/20)
- [20 FFmpeg commands for beginners](https://www.ostechnix.com/20-ffmpeg-commands-beginners/)

## youtube-dl
[youtube-dl](https://ytdl-org.github.io/youtube-dl/index.html) is an online media extractor.  
The ultimate tool for downloading and preserving media files from *[any](https://ytdl-org.github.io/youtube-dl/supportedsites.html)* website.  

### Install
> brew install youtube-dl

### Usage
`cd` the directory for saving file to, then as simple as
> youtube-dl *VIDEO_URL*

### Formats
Most hosted videos have multiple files to stream depending on connection speed.

List formats
> youtube-dl *VIDEO_URL* -F

It will return a long list of available formats, starting with an ID.  
Then download the one you prefer
> youtube-dl *VIDEO_URL* -f ##

Or download the *best* mp4 or similar format
> youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' *VIDEO_URL*

Or download the *best* m4a or audio format
> youtube-dl -f 'bestaudio[ext=m4a]' *VIDEO_URL*

### Additional Links
- [youtube-dl options](https://github.com/ytdl-org/youtube-dl/blob/master/README.md#options)

## And Then...
This is just a short guide for helping our design students do things faster with less interface! Am I missing any crucial tools or tips? Let me know as an issue or make a pull request on [GitHub](https://github.com/ffd8/cli-for-artists-and-designers).

cc [teddavis.org](https://teddavis.org) 2019  
