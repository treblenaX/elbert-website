import { Box } from '@mui/material';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import GITHUB_LANGUAGE_COLORS from '../../public/github_language_colors.json';
import Theme from '../../client/Theme';
import useElementSize from '../../client/hooks/useElementSize';

interface GithubLanguagePieChartProps {
  overallRepoMetrics: any[]
}

export default function GithubLanguagePieChart(props: GithubLanguagePieChartProps) {
  const overallRepoMetrics = props.overallRepoMetrics
  const totalRepoLines = overallRepoMetrics.reduce((acc, curr) => acc + curr.value, 0)
  const [pieIndex, setPieIndex] = useState(0)
  const [boxRef, { height, width }] = useElementSize()

  const onPieEnter = (_, index) => {
    setPieIndex(index)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%'
      }}
      ref={boxRef}
    >
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            activeIndex={pieIndex}
            data={overallRepoMetrics}
            cx="50%"
            cy="40%"
            innerRadius={"50%"}
            outerRadius={"60%"}
            fill="#8884d8"
            stroke={Theme.COLOR.PRIMARY}
            dataKey="value"
            onMouseEnter={onPieEnter}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index
            }) => {
              const RADIAN = Math.PI / 180;
              // eslint-disable-next-line
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              // eslint-disable-next-line
              const x = cx + (radius - 15) * Math.cos(-midAngle * RADIAN);
              // eslint-disable-next-line
              const y = cy + (radius - 15) * Math.sin(-midAngle * RADIAN);
              const repoMetrics = overallRepoMetrics[index]
              const linePercentage = (repoMetrics.value / totalRepoLines).toFixed(2)
              
              if (overallRepoMetrics[index].value / totalRepoLines < 0.01) {
                return null
              }

              return (
                <text
                  x={x}
                  y={y}
                  fill={GITHUB_LANGUAGE_COLORS[repoMetrics.name].color}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  fontSize='0.6rem'
                >
                  {repoMetrics.name} ({linePercentage}%)
                </text>
              );
            }}
          >
          {
            props.overallRepoMetrics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={GITHUB_LANGUAGE_COLORS[entry.name].color} />
            ))
          }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}
