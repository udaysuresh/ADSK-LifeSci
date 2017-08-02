## About

Custom library of annotations for Genetic Constructor

We use this custom library to do quick lookups across constructs / sequences to suggest annotations.

## Processing

Must be run in order:

First run `csv_parser.js` to parse csv/text files in directory and output a JSON for gb parsing intake:

    node csv_parser.js

Then run `genbank_parser.py` to append genbank annotations to the file:

    python genbank_parser.py

This script has a few optional toggles to adjust for the native format (snapgene vs geneious) such that you can switch between having annotations or not by commenting out the initial determining lines (shown in geneious/no native annotation mode):

    #CHOOSE ONE

    #fileName = "SnapGeneLibrary.gb"
    #USE_ANNOTATIONS = True
    fileName = "Geneious_Features.gb"
    USE_ANNOTATIONS = False

Additionally, the file can be output as either a js file or a JSON – decided by setting to either True or False:

    # use this to make it a JS file
    MAKE_JS = T/F
    
Annotations will be saved as `library.js` in the directory. 
