require 'echonest-ruby-api'
require 'json'

API_KEY = 'HHGHYPQC0OMN8TCOA'

# Echonest API 
artist = Echonest::Artist.new(API_KEY, 'Kurt Vile')
puts artist.hotttnesss

#Day
# day = 'sunday'
# # Filename
# filename = 'schemas/' + day + '.json'

# # Read in JSON of artists

# schedule = JSON.parse(IO.read(filename))

# # Inject artists back into hash
# schedule[day].each { |x|  

# 	puts "X: #{x}"

# 	x["artists"].each{ |y|

# 		begin
# 		  artist = Echonest::Artist.new(API_KEY, y["name"])
# 		rescue Echonest::Error => e
# 			"Something happened with echonest, keep trucking #{e}"
# 		end

# 		puts "Hotness for #{y["name"]}, #{artist.hotttnesss}"
# 	}
	

# }

# Write out hash back to file

