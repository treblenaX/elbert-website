import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import GITHUB_LANGUAGE_COLORS from '../../public/github_language_colors.json';
import Theme from '../../client/Theme';

// // adapted from https://recharts.org/en-US/examples/PieChartWithCustomizedLabel
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
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
        fill={languageColor}
      />
      <Sector // outer ring indicator
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={languageColor}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={languageColor} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={languageColor} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={languageColor}>
        {`${language}\n${(percent * 100).toFixed(2)}%1`}
      </text>
    </g>
  );
};

interface GithubLanguagePieChartProps {
  languageData: any[]
}

export default function GithubLanguagePieChart(props: GithubLanguagePieChartProps) {
  const [pieIndex, setPieIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setPieIndex(index);
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={pieIndex}
          activeShape={renderActiveShape}
          data={props.languageData}
          cx="50%"
          cy="50%"
          innerRadius={20}
          outerRadius={30}
          strokeWidth="100px"
          strokeOpacity="100"
          stroke={Theme.COLOR.PRIMARY}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
        {
          props.languageData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={GITHUB_LANGUAGE_COLORS[entry.name].color} />
          ))
        }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
