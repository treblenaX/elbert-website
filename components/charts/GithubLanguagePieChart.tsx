import { Box, Grid, Typography } from '@mui/material';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import GITHUB_LANGUAGE_COLORS from '../../public/github_language_colors.json';
import Theme from '../../client/Theme';
import useElementSize from '../../client/hooks/useElementSize';

// // adapted from https://recharts.org/en-US/examples/PieChartWithCustomizedLabel
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, fontSize } = props;
  const language = props.payload.name;
  const languageColor = GITHUB_LANGUAGE_COLORS[language].color;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={Theme.COLOR.TEXT.LIGHT}>
        {language}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} fontSize={fontSize} textAnchor={textAnchor} fill="#999">
        {`${language} - ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

interface GithubLanguagePieChartProps {
  repoMetrics: any[]
}

export default function GithubLanguagePieChart(props: GithubLanguagePieChartProps) {
  const repoMetrics = props.repoMetrics
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
            activeShape={renderActiveShape}
            data={repoMetrics}
            cx="50%"
            cy="50%"
            innerRadius={"50%"}
            outerRadius={"60%"}
            fill="#8884d8"
            stroke={Theme.COLOR.PRIMARY}
            dataKey="value"
            onMouseEnter={onPieEnter}
            fontSize={width / height * 10}
          >
          {
            props.repoMetrics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={GITHUB_LANGUAGE_COLORS[entry.name].color} />
            ))
          }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}
