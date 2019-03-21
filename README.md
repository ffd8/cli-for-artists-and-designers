# CLI for Artists + Designers
[Command-Line Interface (CLI)](https://en.wikipedia.org/wiki/Command-line_interface) is a great way to perform common tasks involving digital media (converting, cropping, downloading, merging, ...) without the need for a graphical user interface (GUI). These tools are open-source (free) and written to perform single tasks really well. Once you install the following tools, you'll be surprised how rarely you need some big software programs.

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

- MacOS, the built-in CLI is Terminal, sitting in your Utilities directory.  
- Windows, the built-in CLI is CMD, but you may want [msys2](https://www.msys2.org) + [conemu](https://conemu.github.io).  
- Linux, *yeah yeah...*

### Essentials  

- `cd` (change directory), used to set working dir for accessing files.  
- `ls` (list), lists all files within working directory.
- `mkdir` (make directory), creates a new directory with name of passed.  
- `../` (parent directory), used as part of path to navigate/save one directory up.   
- `man` (manual), place before command, to read about its options.
- `open .` (open working directory), view in Finder.
- `say hello world` (text-to-speech), never gets old...  

### Shortcuts

- `TAB` (autocomplete), completes command or directory/filename.
- `UP ARROW` (history), toggle through recent commands.  
- `CTRL + R` (reverse search), search through previous commands.  
- `CTRL + A` (start of line), move cursor to start of line.  
- `CTRL + E` (end of line), move cursor to end of line.  
- `CMD + K` (clear), clears window of previous commands.  


### Set active directory
You usually set the directory you're working in, for easily typing filenames to process or saving items to that specific location.
> cd *path/to/directory*
 
The easiest way to do this is just type `cd` + `spacebar`, then drag and drop the folder into the Terminal window. Hit `Enter` and you're now working in that directory. You can test by listing the contents with `ls`.

### Careful
Use caution if following guides with the following commands  
- `rm`/`rmdir` (remove / remove directory), permanently removes files!  
- `sudo` (root), sometimes needed for system changes, but gives admin privledges.


## Package Manager
A package manager keeps track of open source tools and makes installation easy.

### MacOS
[Homebrew](https://brew.sh) is a great package manager with a HUGE [updated list](https://formulae.brew.sh/) of *formulae*.
 
To install, just copy + paste into the following into Terminal: 
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"  

It will confirm you want to install it, press `ENTER` to continue, then enter your computer's password (only time it should be needed). *FYI: you won't see your password while typing, just press `ENTER` when done.*

Once done ($ will reappear), to install any packages:  
> brew install *packagename*

### Windows
Once you've installed [msys2](https://www.msys2.org) + [conemu](https://conemu.github.io), you'll use their pre-installed [pacman](https://www.archlinux.org/pacman/).  
(pending test)

To add packages:
> pacman -Sy *packagename*

**Note:** This guide focuses on MacOS/Terminal/Homebrew,  
just replace install instructions of `brew install ...` with `pacman -Sy ...`

## Imagemagick
[Imagemagick](https://www.imagemagick.org) deals with images.   
Amazing at batch processing to a directory of images.
### Install
> brew install imagemagik

### Usage
Once installed, you call it with `convert`,  
then pass any number of input and output arguments.

### GIF from directory
Navigate to a collection of images, as described above in *[Set active directory](#set-active-directory)*.  
Grab all \*.png or \*.jpg and output GIF:
> convert *.png -loop 0 test.gif

 
* `convert` launches Imagemagick  
* `*.png` grabs for all pngs  
* `-loop 0` sets infinite looping  
* `test.gif` name of output file (customize).

### Resize in batch
Navigate to a collection of images, as described above in *[Set active directory](#set-active-directory)*.  
Create a directory for your output using `mkdir`:  
> mkdir thumbs

Batch process using `mogrify`: 
> mogrify -resize 128x128 -quality 100 -path ./thumbs *.jpg  
 
* `mogrify` launch batch tool of Imagemagick,   
* `-resize #x#` resizes (can also use percentages)  
* `-quality 100` sets compression  
* `-path ./thumbs` specifies where to put outputs  
* `*.jpg` specifies fileformat of input. 

### Additional Links
- [Imagemagick CLI](https://imagemagick.org/script/command-line-processing.php)
- [Mogrify Guide](https://imagemagick.org/script/mogrify.php)

## FFmpeg
[FFmpeg](https://www.ffmpeg.org) deals with audio/video.  
It's the underlying tech beneath most online/offline media converters.

### Install
> brew install ffmpeg

### Usage
Once installed, call with `ffmpeg`,
pass `-i` input file, options, output file:
> ffmpeg -i myfile.mov myfile.mp4

### Convert
It's really as easy as above! You don't even *need* to set an active directory, you can simply type `ffmpeg -i ` then drag + drop original file, drag + drop again, replacing the suffix with a new filetype:
> ffmpeg -i *input.filetype* *output.filetype*

### Trim
Extract segment from movie 
> ffmpeg -ss 10 -i input.mp4 -c copy -t 15 output.mp4

* `ffmpeg` launches FFmpeg
* `-ss ##` sets starting point in sec
* `-i input.mp4` sets input file
* `-c copy` creates new file, instead of modifying original
* `-t ##` duration for new clip in sec (use `-to ##` for time in clip)
* `output.mp4` name/path for new output file

### Extract frames
Navigate to directory of images, as described above in *[Set active directory](#set-active-directory)*.  
Create directory for output using `mkdir`: 
> mkdir out

Set input file, frames per second for output, file path/type:
> ffmpeg -i input.mp4 -vf fps=1 out/out%03d.png

* `-vf fps=1` exports # frames per second

### Speed
Useful to speed up long screen-recordings:
> ffmpeg -i input.mp4 -filter:v "setpts=0.5*PTS" output.mp4

* `-filter:v "setpts=0.5*PTS"` 0.5 = 50% speed, 1.0 = normal, 1.5 = 150%

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

## And Then...
Read the `man` (manual) pages to become an expert.  
Learn more by doing web-search for command + task you'd like.  
Enjoy more productivity with less interface!   

Missing crucial tools or tips? Make an [issue on GitHub](https://github.com/ffd8/cli-for-artists-and-designers/issues).

cc [teddavis.org](https://teddavis.org) 2019  
additional contributions: [Ya-No](https://github.com/s4ac), [Hansi3D](https://github.com/kritzikratzi)