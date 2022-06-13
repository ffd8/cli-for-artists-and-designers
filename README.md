# CLI for Artists + Designers

[Command-Line Interface (CLI)](https://en.wikipedia.org/wiki/Command-line_interface) is an amazing way to perform common tasks involving digital media (converting, cropping, downloading, merging, ...) without a graphical user interface (GUI). These tools are open-source (free) and written to perform single tasks really well. Once you install the following tools, you'll be surprised how rarely you need some big software programs.

### Table of Contents
- [Basics](#basics) - Let's get started
- [Package Manager](#package-manager) - Installing tools
- [Imagemagick](#imagemagick) - Images
- [FFmpeg](#ffmpeg) - Movies
- [youtube-dl](#youtube-dl) - Download media

## Basics
### Workflow
Once setting the working directory (aka folder) to use, you write single line commands. These start with the name of the command to use, followed by arguments commonly using a flag to signify options ie. `-i` may set the input file, additional options and output destination.  All commands are followed by the `ENTER` key to run.

> `command`  `input`  `options`  `output`  

Commands are sometimes alone, `ls` to list files in current directory,   
or with one input `mkdir blah` creates a new directory called 'blah'.  
Usually a few arguments are needed following the command.

### CLI Program
We enter these commands into the... Command-Line **Interface**.  

- MacOS, built-in CLI is `Terminal`, in Utilities directory ([iTerm](https://www.iterm2.com) is also nice).  
- Windows, built-in CLI is `Command Prompt`, some suggest [msys2](https://www.msys2.org) + [conemu](https://conemu.github.io).  
- Linux, *yeah yeah...*

### Essentials  

- `cd` (change directory), used to set working dir for accessing files.  
- `pwd` (print working dir), check which directory you're in.  
- `ls` (list), lists all files within working directory.
- `mkdir` (make directory), creates a new directory with name of passed.  
- `../` (parent directory), used as part of path to navigate/save one directory up.   
- `open .` (open working directory), view in Finder.
- `man` (manual), place before command, to read about its options.
- `say hello world` (MacOS text-to-speech), never gets old...  

### Shortcuts

- `TAB` (autocomplete), completes command or directory/filename.
- `UP ARROW` (history), toggle through recent commands.  
- `CTRL + R` (reverse search), search through previous commands.  
- `CTRL + A` (start of line), move cursor to start of line.  
- `CTRL + E` (end of line), move cursor to end of line.  
- `CMD + K` (clear), clears window of previous commands.  
- `CTRL + C` (cancel), stop any task mid process.  


### Set active directory
You usually set the directory you're working in to simplify typing filename's by relative path for processing or saving items to that specific location.
> cd *path/to/directory*
 
The easiest way to do this is just type `cd` + `spacebar`, then drag and drop the folder into the CLI window. Hit `Enter` and you're now working in that directory. Test you're there with `pwd` to print the path or `ls` to list all items within it.

### Careful
**Use caution** when snippets include the following commands  
- `rm`/`rmdir` (remove / remove directory), permanently removes files!  
- `sudo` (root), sometimes needed for system changes, but gives admin privledges.

### Additional Links
- [CLI Primer](http://netart.rocks/notes/commandline)
- [Jazz up your ZSH Guide](https://medium.freecodecamp.org/jazz-up-your-zsh-terminal-in-seven-steps-a-visual-guide-e81a8fd59a38)
- [A-Z Index MacOS Command Line](https://ss64.com/osx/)


## Package Manager
A package manager keeps track of open source tools and makes installation easy. It takes a while to setup, but is worth it to quickly access these tools as you dive deeper.

### MacOS
[Homebrew](https://brew.sh) is a great package manager with a HUGE [updated list](https://formulae.brew.sh/formula/) of *formulae*.
 
To install, just copy + paste into the following into Terminal: 
> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"  

It will confirm you want to install XCode dev tools (a few Gb), press `ENTER` to continue, then enter your computer's password (only time it should be needed).  
*FYI: you won't see your password while typing, just press `ENTER` when done.*

Once done ($ or % reappear), then to install packages:  
> brew install *packagename*

### Windows
There is a manager called '[pacman](https://www.archlinux.org/pacman/)' that comes with above CLI ([msys2](https://www.msys2.org) + [conemu](https://conemu.github.io)), but it hasn't been tested and may not be necessary. Instead, you should use imagemagick's binary installer (which includes FFMPEG as an option!)

[Imagemagick - Windows Binary Release](https://imagemagick.org/script/download.php#windows)  
[youtube-dl - Windows Binary install](https://github.com/ytdl-org/youtube-dl/blob/master/README.md#installation)

## Imagemagick
[Imagemagick](https://www.imagemagick.org) deals with images.   
Convert image into ANY format, quickly assemble gifs, and especially batch process a directory of images.
### Install
> brew install imagemagick

*(Windows, see [Package Manager](#package-manager) for tip on installing)*

### Usage
Once installed, you call it with `convert` (Windows use `magick`),  
then pass any number of input and output arguments.

### Convert
You don't *need* to set an active directory, you can simply type `convert ` (spacebar) then drag + drop original file, drag + drop again, replacing the suffix with a new filetype:

> convert INPUT_FILE.xxx OUTPUT_FILE.yyy

* `convert` launches Imagemagick  
* `INPUT_FILE.png`, drag + drop desired image to change
* `OUTPUT_FILE`, drag + drop again, adjusting extension to desired format

### GIF from directory
Navigate to a directory of images, as described above in *[Set active directory](#set-active-directory)*.  
Grab all \*.png or \*.jpg and output GIF:
> convert *.png -loop 0 test.gif

 
* `convert` launches Imagemagick  
* `*.png` searches for PNGs  
* `-loop 0` sets # (0 = infinite) loops (ignored in MacOS preview!)  
* `test.gif` name of output file (customize).

### Resize in batch
Navigate to a directory of images, as described above in *[Set active directory](#set-active-directory)*.  
Create a directory for your output using `mkdir`:  
> mkdir thumbs

Batch process using `mogrify`: 
> mogrify -resize 128x128 -quality 100 -format jpg -path ./thumbs *.jpg  
 
* `mogrify` launch batch tool of Imagemagick,   
* `-resize #x#` resizes (can also use percentages)  
* `-quality 100` sets compression 
* `-format jpg` optional suffix to convert formats 
* `-path ./thumbs` specifies where to put outputs  
* `*.jpg` searches for JPGs in active dir 

### Additional Links
- [Imagemagick CLI](https://imagemagick.org/script/command-line-processing.php)
- [Imagemagick Formats](https://imagemagick.org/script/formats.php)
- [Mogrify Batch Guide](https://imagemagick.org/script/mogrify.php)
- [gifsicle](https://www.lcdf.org/gifsicle/) - for everything GIF!

## FFmpeg
[FFmpeg](https://www.ffmpeg.org) deals with audio/video.  
It's the underlying tech beneath most online/offline media converters.

### Install
> brew install ffmpeg

*(Windows, see [Package Manager](#package-manager) for tip on installing)*

### Usage
Once installed, call with `ffmpeg`,
pass `-i INPUTFILE.xxx`, options, output file:
> ffmpeg -i myfile.mov myfile.mp4

### Convert
It's really as easy as above! You don't even *need* to set an active directory, you can simply type `ffmpeg -i ` then drag + drop original file, drag + drop again, replacing the suffix with a new filetype:
> ffmpeg -i *input.xxx* *output.yyy*

### Movie to GIF
Similar to above, but with an added parameter:
> ffmpeg -i input.mp4 -pix_fmt rgb24 output.gif

### Trim
Extract segment from movie without re-encoding 
> ffmpeg -ss 10 -i input.mp4 -c copy -t 15 output.mp4

* `ffmpeg` launches FFmpeg
* `-ss ##` start from __ in sec
* `-i input.mp4` input file
* `-c copy` use existing codec (instant, no re-encoding)
* `-t ##` duration for new clip in sec (use `-to ##` for time in clip)
* `output.mp4` name/path for new output file

### Extract frames
Navigate to directory video, as described above in *[Set active directory](#set-active-directory)*.  
Create directory for output using `mkdir`: 
> mkdir frames

Set input file, frames per second for output, file path/type:
> ffmpeg -i input.mp4 -vf fps=1 frames/out_%04d.png

* `-vf fps=1` exports # frames per second
* `%04d` use 4 padded digits (0000, 0001, ...)

### Video from directory
Navigate to directory of images, as described above in *[Set active directory](#set-active-directory)*.  
> ffmpeg -framerate 30 -pattern_type glob -i '*.png' \
  -c:v libx264 -pix_fmt yuv420p out.mp4

* `-framerate 30` sets number of frames per second
* `*.png` searches for PNGs (or use `*.jpg`)

### Speed
Useful to speed up long screen-recordings:
> ffmpeg -i input.mp4 -filter:v "setpts=0.5*PTS" output.mp4

* `-filter:v "setpts=0.5*PTS"` 0.5 = faster, 1.0 = normal, 1.5 = slower

### Playback
FFmpeg ships with a minimal audio/video player `ffplay`.  
Basic usage:
> ffplay *input.mp4*

Useful shortcuts:  
- `q`/`ESC` (quit)  
- `f` (toggle fullscreen)  
- `p` / `SPACEBAR` (toggle pause)  
- `m` (toggle mute)  
- `left/right` (seek backward/forward 10 seconds)  
- `up/down` (seek backward/forward 1 minute)

Loop endless at fullscreen:
> ffplay -fs -loop 0 *input.mp4*

View audio waveform:
> ffplay -showmode 1 *input.mp4*

View audio frequency (FFT) spectrogram:
> ffplay -showmode 2 *input.mp4*

View debug [Motion Vectors](https://trac.ffmpeg.org/wiki/Debug/MacroblocksAndMotionVectors):
> ffplay -flags2 +export_mvs -vf codecview=mv=pf+bf+bb input.mp4 

Export Motion Vectors:
> ffmpeg -flags2 +export_mvs -i **input.mp4** -vf "split[src],codecview=mv=pf+bf+bb[vex],[vex][src]blend=all_mode=difference128,eq=contrast=7:brightness=-1:gamma=1.5" -c:v libx264 **output.mp4**


### Additional Links
- [FFmpeg CLI guide](https://www.ffmpeg.org/ffmpeg.html)
- [Complete list of ffmpeg flags / commands](https://gist.github.com/tayvano/6e2d456a9897f55025e25035478a3a50)
- [Werner Robitza FFmpeg guide](http://slhck.info/ffmpeg-encoding-course/#/20)
- [20 FFmpeg commands for beginners](https://www.ostechnix.com/20-ffmpeg-commands-beginners/)
- [More tips for converting images to video](http://hamelot.io/visualization/using-ffmpeg-to-convert-a-set-of-images-into-a-video/)
- [Ludwig Zeller FFmpeg Cheatsheet](https://gitlab.fhnw.ch/hgk-ml/hgk-ml-tools/tree/master/ffmpeg_cheatsheet)

## youtube-dl
[youtube-dl](https://ytdl-org.github.io/youtube-dl/index.html) is an online media extractor.  
The ultimate tool for downloading and archiving media files from *[almost any](https://ytdl-org.github.io/youtube-dl/supportedsites.html)* website.  

### Install
> brew install youtube-dl

*(Windows, see [Package Manager](#package-manager) for tip on installing)*

### Usage
`cd` the desired directory for saving to, then as simple as:
> youtube-dl *VIDEO_URL*

### Formats
Most hosted videos have multiple files to stream depending on connection speed.

List formats:
> youtube-dl *VIDEO_URL* -F

It will return a long list of available formats, starting with an ID.  
Then download the one you prefer:
> youtube-dl *VIDEO_URL* -f ##

Or download the *best* mp4 or similar format:
> youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' *VIDEO_URL*

Or download the *best* m4a or audio format:
> youtube-dl -f 'bestaudio[ext=m4a]' *VIDEO_URL*

### Additional Links
- [youtube-dl options](https://github.com/ytdl-org/youtube-dl/blob/master/README.md#options)
- [youtube-dlp](https://github.com/yt-dlp/yt-dlp), a fork of youtube-dl with additional options

## And Then...
Read the `man` (manual) pages to become an expert.  
Learn by doing web-search for `command` + task you'd like to perform.  
Enjoy more productivity with less interface!   

Missing crucial tools or tips? Make an [issue on GitHub](https://github.com/ffd8/cli-for-artists-and-designers/issues).

Updated 2022.06.13  
cc [teddavis.org](https://teddavis.org) 2019 –    
additional contributions: [Ya-No](https://github.com/s4ac), [Hansi3D](https://github.com/kritzikratzi)