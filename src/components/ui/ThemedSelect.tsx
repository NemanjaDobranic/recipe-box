import Select, {
    type Props as SelectProps,
    type GroupBase,
    type StylesConfig,
} from "react-select";

function createSelectStyles<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
>(): StylesConfig<Option, IsMulti, Group> {
    return {
        control: (base, state) => ({
            ...base,
            backgroundColor: "var(--color-surface)",
            borderColor: state.isFocused
                ? "var(--color-accent)"
                : "var(--color-secondary)",
            boxShadow: "none",
            borderRadius: "0.75rem",
            height: "3rem",
            transition: "all 0.2s ease",
            "&:hover": {
                borderColor: "var(--color-accent)",
            },
        }),

        menu: (base) => ({
            ...base,
            backgroundColor: "var(--color-surface)",
            borderRadius: "0.75rem",
            overflow: "hidden",
        }),

        menuPortal: (base) => ({
            ...base,
            zIndex: 9999, // ensures dropdown is on top of everything
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor:
                state.isSelected || state.isFocused
                    ? "var(--color-secondary)"
                    : "var(--color-surface)",
            color: "var(--color-primary)",
            cursor: "pointer",
        }),

        singleValue: (base) => ({
            ...base,
            color: "var(--color-secondary)", // selected value same as placeholder
        }),

        multiValue: (base) => ({
            ...base,
            backgroundColor: "var(--color-secondary)",
            borderRadius: "0.5rem",
        }),

        multiValueLabel: (base) => ({
            ...base,
            color: "var(--color-background)",
            fontWeight: 500,
        }),

        multiValueRemove: (base) => ({
            ...base,
            color: "var(--color-background)",
            "&:hover": {
                backgroundColor: "var(--color-accent)",
                color: "var(--color-background)",
            },
        }),

        placeholder: (base) => ({
            ...base,
            color: "var(--color-secondary)",
        }),

        input: (base) => ({
            ...base,
            color: "var(--color-primary)",
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: "var(--color-secondary)",
            "&:hover": {
                color: "var(--color-accent)",
            },
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),
    };
}

export function ThemedSelect<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>) {
    return (
        <Select<Option, IsMulti, Group>
            {...props}
            styles={createSelectStyles<Option, IsMulti, Group>()}
            menuPortalTarget={document.body} // ensures dropdown is on top
            classNamePrefix="react-select"
            theme={(theme) => ({
                ...theme,
                borderRadius: 12,
                colors: {
                    ...theme.colors,
                    primary: "var(--color-accent)",
                    primary25: "var(--color-secondary)",
                },
            })}
        />
    );
}