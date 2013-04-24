﻿use strict;
use warnings;
use Getopt::Long;
use Pod::Usage;

my $letters;
my $word;
my $not = '';
my $len;
my %hash;

GetOptions( 'l|letters=s' => \$letters,
            'w|word=s' => \$word,
            'n|not=s' => \$not,
            'len=i' => \$len );
pod2usage(1) unless ($letters || $word);
open my $fh, '<', 'corncob_lowercase.txt' or die "Can't open that file!  $!\n";

while (my $line = <$fh>) {
  $line =~ s/\p{IsC}|['"-]//g;
  $hash{$line} = 1;
}

if ($letters) {
  my @letters = split('', $letters);
  foreach my $key (sort keys %hash) {
    my $all = 0;
    my $original = $key;
    foreach my $letter (@letters) {
      if ($key =~ /$letter/) {
        $all = 1;
        $key =~ s/$letter//;
      }
      else {
        $all = 0;
        last;
      }
    }
    if ($all) {
      if ($not) {
        if ($len && length $original <= $len && $original !~ /[$not]/) {
          print "$original\n";
        }
        elsif (!$len && $original !~ /[$not]/) {
          print "$original\n";
        }
      }
      else {
        if ($len && length $original <= $len) {
          print "$original\n";
        }
        elsif (!$len) {
          print "$original\n";
        }
      }
    }
  }
}
elsif ($word) {
  foreach my $key (sort keys %hash) {
		if ($not) {
			print "$key\n" if $key =~ /^$word$/ && $key !~ /[$not]/;
		}
		else {
			print "$key\n" if $key =~ /^$word$/;
		}
  }
}

=head1 NAME

word.pl
 
=head1 SYNOPSIS

Use:

    perl word.pl [--help] -w regex_word -n exclude_letters | -l letters [-n exclude_letters] [-len max_word_length]
		
Examples:

		perl word.pl --help
		
		# Returns beard, bears, beers, beery, and berry
		perl word.pl -w be.r.
		
		# Returns beery and berry
		perl word.pl -w be.r. -n osd
		
		# Returns beery, berry, beryl, buyer, and derby
		perl word.pl -l brye
		
		# Returns beery and berry
		perl word.pl -l brye -len 5 -n dlu
 
=head1 DESCRIPTION
 
 
=head2 Features
 
=over
 
=item
 
=item
 
=item
 
=back
 
=cut