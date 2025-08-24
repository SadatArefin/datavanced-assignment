using System.Text.Json;
using System.Text.Json.Serialization;

namespace MedApi.Converters;

public class DateOnlyJsonConverter : JsonConverter<DateOnly>
{
    private const string DateFormat = "yyyy-MM-dd";

    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        if (string.IsNullOrEmpty(value))
            throw new JsonException("Invalid date format");

        if (DateOnly.TryParseExact(value, DateFormat, out var date))
            return date;

        throw new JsonException($"Invalid date format. Expected format: {DateFormat}");
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(DateFormat));
    }
}
