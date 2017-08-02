###############################################################################
## reads genbank (BioPerl) file and then tries to separate elements into array

## to be run after csv_parser.js such that an output json is made and ready

# -*- coding: UTF-8 -*-

import sys
import json
from Bio import SeqIO

outputFile = './../outputs/library.js'
features = []

#CHOOSE ONE

#fileName = sys.argv[1]
#USE_ANNOTATIONS = sys.argv[2] #TRUE
fileName = sys.argv[1]
USE_ANNOTATIONS = sys.argv[2] #FALSE


# use this to make it a JS file
MAKE_JS = True

for record in SeqIO.parse(fileName, "genbank"):

    # assume we want features
    if USE_ANNOTATIONS:
        for feature in record.features:
            start = int(feature.location.start)
            end = int(feature.location.end)
            sequence = str(record.seq[start:end])

            dict = {
                'name': feature.qualifiers.get('label','')[0],
                'type': str(feature.type),
                'sequence': str(sequence).translate(None,'#+'),
                # 'description': str(feature.qualifiers.get('product','')) + str(feature.qualifiers.get('note','')),
                # 'product': str(feature.qualifiers.get('product','')),
                # 'note': str(feature.qualifiers.get('note','')),
                # 'translation': str(feature.qualifiers.get('translation','')),
                # 'mol_type': str(feature.qualifiers.get('mol_type','')),
            }
            features.append(dict)
    else:
        feature = record.features[0]

        dict = {
            'name': record.name[0],
            'sequence': (str(record.seq)).translate(None,"#+"),
            'type': str(feature.type),
            # 'id': record.id,
            # 'length': len(record.seq),
            # 'features': str(record.features)
        }
        features.append(dict)

#a for append, w/w+ for writing, r/r+ for reading
with open(outputFile, 'r') as f:
    config = json.load(f)

# add the list of features to existing list
config.extend(features)

# write file, optionally making it JS
with open(outputFile,'w') as f:
    if MAKE_JS:
        f.write('module.exports = ')
    json.dump(config, f, indent=4)

exit()




#useful, but ends up aggregating names, sequences, etc. not grouping
"""
for seq_record in SeqIO.parse("Geneious_Features.gb", "genbank"):
    seq_id.append(seq_record.id)
    names.append(seq_record.name)
    sequences.append(seq_record.seq)
    seq_len.append(len(seq_record))
print(names)
"""


## basic parsing, will just piece apart a file
"""
for seq_record in SeqIO.parse("Geneious_Features.gb", "genbank"):
    return(seq_record.id) # id of sequence
    return(repr(seq_record.seq)) # sequence itself
    return(len(seq_record)) #number of bp
    return(seq_record.name) # name of sequence
    return(seq_record.accessions)
"""
