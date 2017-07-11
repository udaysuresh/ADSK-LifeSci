###############################################################################
## reads FASTA file and then separates elements into array with biopython

## requires a previously created JSON output file called "fasta_output.json"
## DIY by touch & add a "[]" in the file to poorly hack json serialization

# -*- coding: UTF-8 -*-

import json
from Bio import SeqIO

outputFile = 'fasta_output.JSON' # needs to be premade
features = []
fileName = "~~~" # whatever FASTA file you're trying to parse

for record in SeqIO.parse(fileName, "fasta"): 
    dict = {
        'name': record.id,
        'sequence': str(record.seq),
    }
    features.append(dict)

#a for append, w/w+ for writing, r/r+ for reading
with open(outputFile, 'r') as f:
    config = json.load(f)

config.extend(features)

# write file, optionally making it JS
with open(outputFile,'w') as f:
    json.dump(config, f, indent=4)

exit()
