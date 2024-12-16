interface TimeFilterProps {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
}

const TimeFilter = ({
                        startDate,
                        endDate,
                        setStartDate,
                        setEndDate,
                    }: TimeFilterProps) => {
    return (
        <div className="flex gap-4 mb-4">
            <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">End Date</label>
                <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded-md p-2"
                />
            </div>
        </div>
    );
};

export default TimeFilter;
