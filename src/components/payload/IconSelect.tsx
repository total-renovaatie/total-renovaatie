"use client";
import React from "react";
import * as LucideIcons from "lucide-react";
import { SelectInput, useField, FieldLabel } from "@payloadcms/ui";

const IconSelect: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  const options = [
    { label: "Home / Structural", value: "Home" },
    { label: "Construction / Hammer", value: "Hammer" },
    { label: "Boxes / Storage", value: "Boxes" },
    { label: "Design / Layout", value: "LayoutDashboard" },
    { label: "Plumbing / Wrench", value: "Wrench" },
    { label: "Painting / Brush", value: "Paintbrush" },
    { label: "Electrical / Zap", value: "Zap" },
    { label: "Heating / Flame", value: "Flame" },
    { label: "Cooling / Snowflake", value: "Snowflake" },
    { label: "Outdoor / Tree", value: "TreePine" },
    { label: "Garden / Flower", value: "Flower2" },
    { label: "Windows / Grid", value: "Grid3X3" },
    { label: "Safety / Shield", value: "ShieldCheck" },
    { label: "Kitchen / Utensils", value: "Utensils" },
    { label: "Bathroom / Bath", value: "Bath" },
  ];

  // 1. Get the icon from the library using the string value
  // 2. Cast as any to bypass the "name not found" TS error
  // 3. Rename to PascalCase (IconComponent) so React accepts it as a tag
  const IconComponent = value ? (LucideIcons as any)[value] : null;

  return (
    <div className="field-type text" style={{ marginBottom: "20px" }}>
      <FieldLabel label="Category Icon" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginTop: "5px",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <SelectInput
            path={path}
            name={path}
            options={options}
            value={value}
            onChange={(opt: any) => setValue(opt.value)}
          />
        </div>

        <div
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f4f6",
            border: "2px solid #43749B",
            borderRadius: "8px",
            flexShrink: 0,
          }}
        >
          {/* Use the capitalized IconComponent here */}
          {IconComponent ? (
            <IconComponent size={28} strokeWidth={2.5} color="#1e293b" />
          ) : (
            <span style={{ fontSize: "10px", color: "#64748b" }}>None</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default IconSelect;
