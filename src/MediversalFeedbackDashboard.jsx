// ✅ Modern Light Theme Dashboard with Loading States
import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { FaUpload, FaFilter, FaChartBar, FaInfoCircle, FaUsers, FaSpinner, FaChartLine, FaChartPie, FaMapMarkerAlt } from "react-icons/fa";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#06b6d4"];

const CHARTS = [
  { title: "📊 Overall Satisfaction", key: "Overall, how satisfied are you with your experience working at Mediversal?", responses: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"], insight: "" },
  { title: "🤝 Team & Management Support", key: "How well do you feel supported by your team and management in your daily tasks?", responses: ["Very well supported", "Supported", "Somewhat supported", "Neutral", "Not supported at all"], insight: "" },
  { title: "🗣️ Communication Transparency", key: "How would you rate communication and transparency between staff and management?", responses: ["Very Good", "Good", "Neutral", "Poor", "Very Poor"], insight: "" },
  { title: "🎯 Recognition of Contributions", key: "Do you feel that your contributions are valued by the team and the hospital?", responses: ["Always", "Mostly", "Sometimes", "Rarely -", "Not at all"], insight: "" },
  { title: "🏢 Work Culture", key: "How would you rate the overall work culture in the hospital?", responses: ["Excellent", "Good", "Neutral", "Poor", "Very Poor"], insight: "" },
  { title: "📢 Encouraged to Report Issues", key: "Do you feel encouraged to report any concerns related to patient care and safety?", responses: ["Always encouraged", "Mostly encouraged", "Sometimes encouraged", "Rarely encouraged -", "Not encouraged at all"], insight: "" },
  { title: "⚖️ Work-Life Balance", key: "How satisfied are you with your work-life balance?", responses: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"], insight: "" },
  { title: "🏥 Recommend Mediversal", key: "Would you recommend Mediversal to others looking for a job e.g., candidates or peers?", responses: ["Definitely", "Likely", "Neutral", "Unlikely", "Definitely not"], insight: "" },
  { title: "💰 Salary Alignment", key: "Do you believe that the salary you receive is in line with the market standard for your role and experience?", responses: ["Completely", "Mostly", "Slightly", "Neutral", "Not at all"], insight: "" },
  { title: "📣 Brand Value", key: "How would you rate the brand value of Mediversal in the healthcare market?", responses: ["Excellent", "Good", "Neutral", "Poor", "Very Poor"], insight: "" },
  { title: "🛡️ Workplace Safety", key: "Do you feel safe within your workplace environment?", responses: ["Very safe", "Safe", "Somewhat safe", "Neutral", "Not safe at all"], insight: "" },
  { title: "🧩 Discrimination Perception", key: "Do you feel there is any discrimination in the work environment based on caste, religion, gender, or region?", responses: ["Never", "Rarely", "Sometimes -", "Very frequently", "Not sure"], insight: "" },
  { title: "📈 Confidence in Leadership", key: "Do you have confidence in the management's ability to lead and address concerns within the organization?", responses: ["Completely confident", "Mostly confident", "Slightly confident", "Neutral", "No confidence at all"], insight: "" },
  { title: "📈 Culture Improvement", key: "Do you think the work culture at Mediversal has improved over time?", responses: ["Significantly improved", "Improved", "Slightly improved", "Neutral", "Not improved at all"], insight: "" },
  { title: "🌱 Sense of Belonging", key: "Do you feel a sense of belonging within the organization?", responses: ["Always", "Mostly", "Sometimes -", "Rarely -", "Not at all"], insight: "" },
  { title: "🛠️ Resource Availability", key: "Do you feel that you have adequate resources Equipment/Instrument/Consumables/Stationeries to perform your job effectively?", responses: ["More than adequate", "Adequate", "Neutral", "Somewhat inadequate", "Not at all"], insight: "" },
  { title: "👨‍⚕️ Recommend for Admission", key: "Would you recommend your friends or family members to admit their near and dear ones in Mediversal Hospital?", responses: ["Definitely", "Likely", "Neutral", "Unlikely", "Definitely not"], insight: "" },
  { title: "🔁 Retention Intent", key: "Overall, do you see yourself staying long-term at Mediversal?", responses: ["Definitely", "Likely", "Neutral", "Unlikely", "Definitely not"], insight: "" },
  { title: "👩‍⚕️ Clinical Staff Rating", key: "How would you rate the clinical staff Doctors/Nurses/Paramedical staff at Mediversal in terms of patient care?", responses: ["Excellent", "Good", "Neutral", "Very poor"], insight: "" },
  { title: "🏬 Organizational Integration", key: "Do you feel integrated within the organization as a whole, or only with the unit you are posted in?", responses: ["Fully integrated across the organization", "Mostly integrated", "Somewhat integrated", "Only with my unit", "Not integrated at all"], insight: "" },
  { title: "👥 HR Support", key: "Do you feel that HR adequately supports the employees in resolving concerns and improving their work experience?", responses: ["Completely supported", "Mostly supported", "Somewhat supported", "Rarely supported -", "Not supported at all"], insight: "" }
];

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="relative">
      <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
      <div className="relative z-10">
        <FaSpinner className="text-blue-500 text-4xl animate-spin" />
      </div>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-gray-200 p-2 rounded-lg w-8 h-8 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
    </div>
    <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
    <div className="mt-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </div>
  </div>
);

const UploadCard = ({ onUpload, isLoading }) => {
  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full max-w-3xl mx-auto">
        <div className="w-full flex justify-center items-center border-2 border-blue-100 rounded-2xl bg-white shadow-lg p-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full max-w-3xl mx-auto">
      <div className="w-full flex justify-center items-center border-2 border-blue-100 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] p-12">
        <label className="flex flex-col items-center space-y-8 cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
            <div className="relative z-10 bg-blue-500 p-6 rounded-full">
              <FaUpload className="text-4xl text-white" />
            </div>
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to Mediversal Analytics</h2>
            <p className="text-gray-600">Upload your employee feedback data to generate insights</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button 
              type="button"
              onClick={handleButtonClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-100"
            >
              Choose File
            </button>
            <p className="text-gray-500 text-sm">or drag and drop your file here</p>
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            accept="application/JSON" 
            onChange={onUpload} 
            className="hidden" 
          />
        </label>
      </div>
    </div>
  );
};

const FilterPanel = ({ filters, setFilters, options, isLoading }) => (
  <div className="flex flex-wrap gap-4 justify-center py-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center gap-2 text-blue-500">
      <FaFilter className="text-xl" />
      <span className="font-semibold">Filters</span>
    </div>
    {Object.entries(filters).map(([key, value]) => (
      <div key={key} className="relative">
        <select
          className={`border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          value={value}
          onChange={(e) => setFilters(key, e.target.value)}
          disabled={isLoading}
        >
          <option value="">All {key}</option>
          {options[key]?.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping"></div>
              <div className="relative z-10">
                <FaSpinner className="text-blue-500 animate-spin" />
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

const Insight = ({ text }) => (
  <div className="flex items-start gap-3 text-sm text-gray-600 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
    <FaInfoCircle className="text-blue-500 mt-1" />
    <p className="italic">{text}</p>
  </div>
);

const Section = ({ title, children, question }) => (
  <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] border border-gray-100">
    <div className="flex items-center gap-3 mb-4 group relative">
      <div className="bg-blue-500 p-2 rounded-lg">
        <FaChartBar className="text-white" />
      </div>
      <h2 className="text-lg font-bold text-gray-800 cursor-help group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h2>
      <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <p className="text-sm text-gray-600">{question}</p>
      </div>
    </div>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-blue-600 font-medium">{data.value} responses</p>
        <p className="text-gray-600">{data.percentage}% of department total</p>
      </div>
    );
  }
  return null;
};

const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      active
        ? "bg-blue-500 text-white shadow-lg"
        : "bg-white text-gray-600 hover:bg-gray-50"
    }`}
    onClick={onClick}
  >
    <Icon className="text-lg" />
    {children}
  </button>
);

const BivariateAnalysis = ({ data, filters, charts }) => {
  const [selectedMetric, setSelectedMetric] = useState(charts[0].key);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [totalResponses, setTotalResponses] = useState({});

  const allDepartments = [...new Set(data.map(d => d["What is your department?"]).filter(Boolean))];
  const allPlaces = [...new Set(data.map(d => d["What is your primary place of work?"]).filter(Boolean))];

  useEffect(() => {
    setSelectedDepartments([]);
    setSelectedPlaces(allPlaces);

    const totals = {};
    allDepartments.forEach(dept => {
      allPlaces.forEach(place => {
        const key = `${dept} | ${place}`;
        totals[key] = data.filter(d =>
          d["What is your department?"] === dept &&
          d["What is your primary place of work?"] === place
        ).length;
      });
    });
    setTotalResponses(totals);
  }, [data]);

  const handleDepartmentChange = (dept) => {
    setSelectedDepartments(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const handlePlaceChange = (place) => {
    setSelectedPlaces(prev =>
      prev.includes(place) ? prev.filter(p => p !== place) : [...prev, place]
    );
  };

  const currentChart = charts.find(c => c.key === selectedMetric);
  if (!currentChart) return <p>No valid chart found</p>;

  const metricData = [];

  selectedDepartments.forEach(dept => {
    selectedPlaces.forEach(place => {
      const label = `${dept} | ${place}`;
      const filtered = data.filter(d =>
        d["What is your department?"] === dept &&
        d["What is your primary place of work?"] === place
      );
      const total = totalResponses[label] || 0;

      const responses = currentChart.responses.map(response => {
        const count = filtered.filter(d => d[currentChart.key] === response).length;
        const percentage = total > 0 ? (count / total * 100).toFixed(1) : 0;
        return {
          name: response,
          value: count,
          percentage
        };
      });

      metricData.push({
        department: label,
        data: responses,
        totalResponses: total
      });
    });
  });

  return (
    <div className="space-y-4">
      {/* Header Section - More compact */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Bivariate Analysis</h2>
          <p className="text-sm text-gray-600">Compare responses across departments and locations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 rounded-lg px-4 py-2">
            <p className="text-xs text-gray-600">Total Responses</p>
            <p className="text-lg font-bold text-blue-600">{data.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg px-4 py-2">
            <p className="text-xs text-gray-600">Selected</p>
            <p className="text-lg font-bold text-green-600">{metricData.length}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left Column - Filters */}
        <div className="md:col-span-1 space-y-4">
          {/* Metric Selection */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-3">
              <FaChartBar className="text-blue-500" />
              <h3 className="font-semibold text-gray-800">Select Metric</h3>
            </div>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              {charts.map(chart => (
                <option key={chart.key} value={chart.key}>{chart.title}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-3">
              <FaFilter className="text-blue-500" />
              <h3 className="font-semibold text-gray-800">Departments</h3>
            </div>
            <div className="space-y-2">
              {allDepartments.map(dept => (
                <label key={dept} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept)}
                    onChange={() => handleDepartmentChange(dept)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <span className="text-sm text-gray-700">{dept}</span>
                    <span className="text-xs text-gray-500 ml-2">({totalResponses[dept] || 0})</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-blue-500" />
              <h3 className="font-semibold text-gray-800">Locations</h3>
            </div>
            <div className="space-y-2">
              {allPlaces.map(place => (
                <label key={place} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPlaces.includes(place)}
                    onChange={() => handlePlaceChange(place)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{place}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Charts */}
        <div className="md:col-span-3">
          {selectedDepartments.length === 0 ? (
            // Empty state
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FaChartLine className="text-gray-400 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Departments Selected</h3>
              <p className="text-gray-600">Please select at least one department to view the comparison</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metricData.map((deptData, idx) => (
                <div key={deptData.department} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{deptData.department}</h3>
                      <p className="text-xs text-gray-500">{deptData.totalResponses} responses</p>
                    </div>
                    <div className="bg-blue-50 px-2 py-1 rounded-full">
                      <span className="text-xs font-medium text-blue-600">
                        {((deptData.totalResponses / data.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={deptData.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        interval={0} 
                        angle={-20} 
                        textAnchor="end" 
                        height={60} 
                        stroke="#6b7280"
                        tick={{ fontSize: 11 }} 
                      />
                      <YAxis allowDecimals={false} stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="value" 
                        fill={COLORS[idx % COLORS.length]} 
                        radius={[4, 4, 0, 0]} 
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ Department: "", Years: "", Workplace: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [activeTab, setActiveTab] = useState("univariate"); // "univariate" or "bivariate"

  const handleUpload = (e) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        // Increase delay to 3 seconds
        setTimeout(() => {
          setData(parsed);
          setIsLoading(false);
        }, 100); // 3 second delay
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Invalid JSON file. Please upload a valid format.");
        setIsLoading(false);
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  const handleFilterChange = (key, value) => {
    setIsFiltering(true);
    setFilters(prev => ({ ...prev, [key]: value }));
    // Increase delay to 1.5 seconds
    setTimeout(() => {
      setIsFiltering(false);
    }, 1500); // 1.5 second delay
  };

  const filteredData = data.filter((d) =>
    (!filters.Department || d["What is your department?"] === filters.Department) &&
    (!filters.Years || d["Years of Service"] === filters.Years) &&
    (!filters.Workplace || d["What is your primary place of work?"] === filters.Workplace)
  );

  const countByResponse = (key, responses) => {
    if (!filteredData.length) return [];
    return responses.map((r) => ({ 
      name: r, 
      value: filteredData.filter((d) => d[key] === r).length 
    }));
  };

  const extractOptions = (field) => {
    if (!data.length) return [];
    return [...new Set(data.map((d) => d[field]).filter(Boolean))];
  };

  const filterOptions = {
    Department: extractOptions("What is your department?"),
    Years: extractOptions("Years of Service"),
    Workplace: extractOptions("What is your primary place of work?")
  };

  const getGroupedData = (groupField, valueField, allValues) => {
    if (!filteredData.length) return [];
    const groups = extractOptions(groupField);
    return groups.map((g) => {
      const entries = filteredData.filter((d) => d[groupField] === g);
      const obj = { name: g };
      allValues.forEach((val) => {
        obj[val] = entries.filter((e) => e[valueField] === val).length;
      });
      return obj;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Mediversal Employee Analytics
          </h1>
          <p className="text-gray-600">Comprehensive feedback analysis and insights</p>
        </div>

        {data.length === 0 ? (
          <UploadCard onUpload={handleUpload} isLoading={isLoading} />
        ) : (
          <>
            <div className="flex justify-center gap-4 mb-6">
              <TabButton
                active={activeTab === "univariate"}
                onClick={() => setActiveTab("univariate")}
                icon={FaChartBar}
              >
                Univariate Analysis
              </TabButton>
              <TabButton
                active={activeTab === "bivariate"}
                onClick={() => setActiveTab("bivariate")}
                icon={FaChartLine}
              >
                Bivariate Analysis
              </TabButton>
            </div>

            {activeTab === "univariate" ? (
              <>
                <FilterPanel 
                  filters={filters} 
                  setFilters={handleFilterChange} 
                  options={filterOptions}
                  isLoading={isFiltering}
                />
                <div className="flex justify-center w-full my-6">
                  <div className="bg-white rounded-full py-3 px-6 shadow-lg border border-gray-100 inline-flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-full">
                      <FaUsers className="text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Showing {filteredData.length} responses</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {isLoading ? (
                    Array(6).fill(0).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))
                  ) : (
                    CHARTS.map((chart, idx) => {
                      const chartData = chart.groupKey 
                        ? getGroupedData(chart.key, chart.groupKey, extractOptions(chart.groupKey))
                        : countByResponse(chart.key, chart.responses).sort((a, b) => 
                            chart.responses.indexOf(a.name) - chart.responses.indexOf(b.name)
                          );

                      return (
                        <Section 
                          key={idx} 
                          title={chart.title}
                          question={chart.key}
                        >
                          <ResponsiveContainer width="100%" height={360}>
                            {chart.groupKey ? (
                              <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis allowDecimals={false} stroke="#6b7280" />
                                <Tooltip content={<CustomTooltip total={filteredData.length} />} />
                                <Legend />
                                {extractOptions(chart.groupKey).map((val, i) => (
                                  <Bar 
                                    key={val} 
                                    dataKey={val} 
                                    fill={COLORS[i % COLORS.length]} 
                                    radius={[5, 5, 0, 0]} 
                                  />
                                ))}
                              </BarChart>
                            ) : (
                              <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis 
                                  dataKey="name" 
                                  interval={0} 
                                  angle={-20} 
                                  textAnchor="end" 
                                  height={60} 
                                  stroke="#6b7280"
                                  tick={{ fontSize: 12, wordBreak: 'break-word' }} 
                                />
                                <YAxis allowDecimals={false} stroke="#6b7280" />
                                <Tooltip content={<CustomTooltip total={filteredData.length} />} />
                                <Bar 
                                  dataKey="value" 
                                  fill={COLORS[idx % COLORS.length]} 
                                  radius={[5, 5, 0, 0]} 
                                  animationDuration={1500}
                                />
                              </BarChart>
                            )}
                          </ResponsiveContainer>
                          <Insight text={chart.insight} />
                        </Section>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <BivariateAnalysis data={filteredData} filters={filters} charts={CHARTS} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
