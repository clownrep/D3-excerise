# Ran this file in jupyter notebook to get the cleaned csv below
import pandas as pd

# Load the dataset
df = pd.read_csv("socialMedia.csv")

# Convert "Likes" column to numeric
df["Likes"] = pd.to_numeric(df["Likes"], errors="coerce")

# Group by formatted date and calculate the average Likes
df_avg = df.groupby("Date")["Likes"].mean().reset_index()

# Rename column to match required format
df_avg.rename(columns={"FormattedDate": "Date", "Likes": "AvgLikes"}, inplace=True)

# Round AvgLikes to 3 decimal places
df_avg["AvgLikes"] = df_avg["AvgLikes"].round(3)

# Save to CSV
df_avg.to_csv("SocialMediaTime.csv", index=False)
