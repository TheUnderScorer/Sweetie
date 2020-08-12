cd ./ios
xcodebuild -workspace sweetie.xcworkspace -scheme sweetie archive -archivePath sweetie.xcarchive -allowProvisioningUpdates
xcodebuild -exportArchive -archivePath ./sweetie.xcarchive -exportPath . -exportOptionsPlist sweetie/Info.plist
