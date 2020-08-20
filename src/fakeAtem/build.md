# Build AtemMock

## Base project

Clone this project with recursion https://github.com/sparkpunkd/AtemUtils

    git clone --recursive https://github.com/sparkpunkd/AtemUtils

This will include the required `LibAtem`.

## Make sure .NET SDK and runtime present

Rerquired are .NET core 3.1, SDK 3.1 and .NET runtime 3.1 and 2.1. See [MS intsall instructions](https://docs.microsoft.com/en-us/dotnet/core/install/).

## Faking-it data files

Grab the data file(s) required to mock being a particular kind of Atem. https://github.com/nrkno/tv-automation-atem-connection/tree/master/src/__tests__/connection

## Build

For linux:

    cd AtemMock
    dotnet publish -o dist-linux -c Release --self-contained -r linux-x64

For Windows 10:

    cd AtemMock
    dotnet publish -o dist-win -c Release --self-container -r win10-x64

The resulting `dist-...` folder can be zipped.

## Run

Either ...

    cd AtemMock
    dotnet run <atem-config>.data

Or buiild a distribution and run the executable:

* Linux: `dist-linux/AtemMock`
* Windows: `dist-win\AtemMock.exe`) with the path to a data file.