require 'echonest-ruby-api'
require 'json'

API_KEY = 'HHGHYPQC0OMN8TCOA'

# Echonest API 
# artist = Echonest::Artist.new(API_KEY, 'Weezer')

# Filename
filename = 'schemas/friday.json'

# Read in JSON of artists

artists = JSON.parse(IO.read(filename))

# Inject artists back into hash

puts artists

# Write out hash back to file

