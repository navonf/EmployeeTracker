# React Native Mobile Application

### How I got it running:
#### Android SDK and Virtual Device:
* Install android-studio
* Make Random project
* Go to ```Tools>Android>SDK Manager```.
* At the top, there should be a filepath for the ```Android SDK Location```. Make note of this.
* Enable ```Android 6.0 Marshmallow```
* Click ```Apply``` It will take a second or so to finish downloading.
* Go to the ```SDK Tools``` Tab.
* Make sure ```Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools, Android SDK Tools, Support Repository``` Are all checked.
* Click ```Apply``` It will take a second or so to finish downloading.
* Exit the menu, and go to Go to ```Tools>Android>AVD Manager```
* Click ```Create Virtual Device...``` I choose the ```Nexus 6``` Entry. Click ```Next```
* Under the ```x86 Images``` tab, I choose ```Marshmallow```. You might have to download it. The ```ABI``` Doesnt matter, its simply the target for building the application. All that matters is that the ```API Level = 23```.
* Click ```Next``` and ```Finish```. Now click the run button for the Virtual Device.

#### Now for the folder.
* NOTE: The android virtual device must be ruinning for this part.
* Pull the project, cd to the ```mobile``` folder.
* Run ```npm install```, let it finish. then ```react-native start```. Leave this terminal running. I recommend running inside a ```tmux``` session or equivalent.
* If you get errors about paths not being correct, here or at any point, look below at my paths.
* In a new terminal in the ```mobile``` folder, run the command ```react-native run-android```. Switch to your android virtual device and the react-native application should open in about 30 seconds or so. Running this command twice might be necessary if you get the ```mobile has crashed``` error on your virtual device.
* You can now edit App.js and add any other components necessary. For android, you simply need to double tap ```R``` when inside the AVD to reload changes.

NOTE: If you get some error such as ``` ERROR  watch .../EmployeeTracker/mobile/android/app/build/intermediates/res/merged/debug/values-km-rKH ENOSPC``` while running ```react-native start```, cd to the ```android/``` folder, run ```./gradlew clean && cd ..``` and then you should be good! 


#### Paths I needed to add:
I needed to add paths to ```ANDROID_HOME```, ```ANDROID_SDK_ROOT```, and the ```tools``` and ```platform-tools``` subfolders of ```ANDROID_HOME```. I am running linux, and my Android SDK from the ```Android SDK Location``` was ```/home/ryan/Android/Sdk```. Therefore I added these lines to my ```~/.zshrc```. (If you just use bash or something else, figure out where to add ```export```s too.)

```
 export ANDROID_HOME=/home/ryan/Android/Sdk
 export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
 export ANDROID_SDK_ROOT=$ANDROID_HOME
```
Windows You have to edit your ```PATH``` variable similarily.
