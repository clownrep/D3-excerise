import pandas as pd

# Load the dataset
df = pd.read_csv("social_media_data.csv")

# Convert "Likes" column to numeric
df["Likes"] = pd.to_numeric(df["Likes"], errors="coerce")

# Group by Platform and PostType, then calculate the mean Likes
df_avg = df.groupby(["Platform", "PostType"])["Likes"].mean().reset_index()

# Round AvgLikes to 2 decimal places
df_avg["AvgLikes"] = df_avg["Likes"].round(2)

# Drop the original Likes column
df_avg = df_avg.drop(columns=["Likes"])

# Save to CSV
df_avg.to_csv("SocialMediaAvg.csv", index=False)
