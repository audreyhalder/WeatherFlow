# meteo-webpage-2.0

## How to get rid of the (unrealistic) peaks in the wind?

To eliminate unrealistic peaks, we examined three CSV datasets. During our analysis, we observed that the maximum velocity recorded was between 9.00-15.00 m/s. However, we also identified some unrealistic data points such as 333, 421, and 813. It is apparent that decimal points might be missing in these values, suggesting that they could be 3.33, 4.21, and 8.13, respectively.

We presented two possible approaches to Mr. Bergmann for addressing this issue:

1. Exclude these unrealistic data points by applying a threshold.
2. Rectify these data points by adding a decimal point after the first digit.

Mr. Bergmann expressed a preference for the first option. Consequently, we implemented a filter before performing computations. The filter now omits any values above 50.But Mr Bergmann liked the first option. Therefore, filter had been implemented before computation: now, it will skip all the values which are above 50:

```

if(maxValue >= 50) continue;

```

The computations are performed within a loop, which means that the calculations for such data points are skipped during each iteration. In this case, the value of 50 used as the threshold is arbitrary and can be replaced with any desired value.

Additionally, it is worth noting that the CSV file contains numerous missing values. These missing values are also excluded using the same procedure, as demonstrated by the following code snippet

```

if (ColumnData[index] == "") continue;

```

The filter described above is applied to each of the datasets individually.
